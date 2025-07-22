import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { quizRequestSchema, type QuizRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import QuizInterface from "@/components/QuizInterface";

interface QuizResponse {
  success: boolean;
  quiz?: {
    id: number;
    verb: string;
    tense: string;
    questions: any[];
  };
  error?: string;
}

const TOP_10_FRENCH_VERBS = [
  { value: "être", label: "être (to be)" },
  { value: "avoir", label: "avoir (to have)" },
  { value: "faire", label: "faire (to do/make)" },
  { value: "dire", label: "dire (to say/tell)" },
  { value: "aller", label: "aller (to go)" },
  { value: "voir", label: "voir (to see)" },
  { value: "savoir", label: "savoir (to know)" },
  { value: "pouvoir", label: "pouvoir (to be able to)" },
  { value: "vouloir", label: "vouloir (to want)" },
  { value: "venir", label: "venir (to come)" }
];

const TIME_FRAMES = [
  { value: "past", label: "Past" },
  { value: "present", label: "Present" },
  { value: "future", label: "Future" }
];

const TENSE_TYPES = {
  past: [
    { value: "simple", label: "Simple (Passé Composé)" },
    { value: "perfect", label: "Perfect (Plus-que-parfait)" },
    { value: "continuous", label: "Continuous (Imparfait)" },
    { value: "conditional", label: "Conditional (Conditionnel Passé)" }
  ],
  present: [
    { value: "simple", label: "Simple (Présent)" },
    { value: "perfect", label: "Perfect (Passé Composé)" },
    { value: "continuous", label: "Continuous (Présent Progressif)" },
    { value: "conditional", label: "Conditional (Conditionnel Présent)" }
  ],
  future: [
    { value: "simple", label: "Simple (Futur Simple)" },
    { value: "perfect", label: "Perfect (Futur Antérieur)" },
    { value: "continuous", label: "Continuous (Futur Proche)" },
    { value: "conditional", label: "Conditional (Conditionnel Présent)" }
  ]
};

export default function Home() {
  const [quizResult, setQuizResult] = useState<QuizResponse | null>(null);
  const [showQuizInterface, setShowQuizInterface] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuizRequest>({
    resolver: zodResolver(quizRequestSchema),
    defaultValues: {
      verb: "",
      timeFrame: undefined,
      tenseType: "",
    },
  });

  // Watch for timeFrame changes to reset tenseType
  const watchTimeFrame = form.watch("timeFrame");
  
  useEffect(() => {
    form.setValue("tenseType", "");
  }, [watchTimeFrame, form]);

  const generateQuizMutation = useMutation({
    mutationFn: async (data: QuizRequest) => {
      const response = await apiRequest("POST", "/api/get-quiz", data);
      return response.json() as Promise<QuizResponse>;
    },
    onSuccess: (data) => {
      if (data.success) {
        setQuizResult(data);
        setShowQuizInterface(true);
      } else {
        toast({
          title: "Quiz Not Available",
          description: data.error || "This quiz combination is not yet available. Please try another combination.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to generate quiz";
      const isOverloadError = errorMessage.includes("high demand") || errorMessage.includes("overloaded");
      
      toast({
        title: isOverloadError ? "Service Busy" : "Error",
        description: isOverloadError 
          ? "The AI service is experiencing high demand. Please try again in a moment." 
          : errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuizRequest) => {
    generateQuizMutation.mutate(data);
  };

  const handleQuizComplete = () => {
    setShowQuizInterface(false);
    setQuizResult(null);
  };

  const chooseRandomVerb = () => {
    const randomVerb = TOP_10_FRENCH_VERBS[Math.floor(Math.random() * TOP_10_FRENCH_VERBS.length)];
    form.setValue("verb", randomVerb.value);
  };

  const chooseRandomTimeFrame = () => {
    const timeFrames = Object.keys(TENSE_TYPES) as Array<keyof typeof TENSE_TYPES>;
    const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
    form.setValue("timeFrame", randomTimeFrame);
  };

  const chooseRandomTenseType = () => {
    const currentTimeFrame = form.getValues("timeFrame");
    if (currentTimeFrame) {
      const availableTenses = TENSE_TYPES[currentTimeFrame as keyof typeof TENSE_TYPES] || [];
      if (availableTenses.length > 0) {
        const randomTense = availableTenses[Math.floor(Math.random() * availableTenses.length)];
        form.setValue("tenseType", randomTense.value);
      }
    }
  };

  const availableTenseTypes = watchTimeFrame ? TENSE_TYPES[watchTimeFrame as keyof typeof TENSE_TYPES] || [] : [];

  // Show quiz interface when quiz is loaded
  if (showQuizInterface && quizResult?.quiz) {
    return (
      <QuizInterface 
        quiz={quizResult.quiz}
        onComplete={handleQuizComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">French Verb Master</h1>
          <p className="text-muted-foreground text-lg">Select a verb and tense to start your quiz.</p>
        </div>

        {/* Quiz Generator Card */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Step 1: Choose a Verb */}
                <FormField
                  control={form.control}
                  name="verb"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-3">
                        <FormLabel className="text-lg font-medium text-white">
                          1. Choose a Verb
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={chooseRandomVerb}
                          className="border-border text-muted-foreground hover:text-white hover:bg-input"
                        >
                          Choose for me
                        </Button>
                      </div>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-input border-border text-white">
                            <SelectValue placeholder="dire (to say/tell)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TOP_10_FRENCH_VERBS.map((verb) => (
                            <SelectItem key={verb.value} value={verb.value}>
                              {verb.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Step 2: Choose Time Frame */}
                <FormField
                  control={form.control}
                  name="timeFrame"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-3">
                        <FormLabel className="text-lg font-medium text-white">
                          2. Choose a Time Frame
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={chooseRandomTimeFrame}
                          className="border-border text-muted-foreground hover:text-white hover:bg-input"
                        >
                          Choose for me
                        </Button>
                      </div>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-input border-border text-white">
                            <SelectValue placeholder="Select time frame..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIME_FRAMES.map((timeFrame) => (
                            <SelectItem key={timeFrame.value} value={timeFrame.value}>
                              {timeFrame.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Step 3: Choose Tense Type */}
                <FormField
                  control={form.control}
                  name="tenseType"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-3">
                        <FormLabel className="text-lg font-medium text-white">
                          3. Choose a Tense to Test
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={chooseRandomTenseType}
                          disabled={!watchTimeFrame}
                          className="border-border text-muted-foreground hover:text-white hover:bg-input disabled:opacity-50"
                        >
                          Choose for me
                        </Button>
                      </div>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        disabled={!watchTimeFrame}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-input border-border text-white">
                            <SelectValue placeholder={watchTimeFrame ? "Past Perfect (Plus-que-parfait)" : "Select time frame first..."} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTenseTypes.map((tenseType) => (
                            <SelectItem key={tenseType.value} value={tenseType.value}>
                              {tenseType.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Generate Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={generateQuizMutation.isPending}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium"
                    style={{ background: "var(--purple-gradient)" }}
                  >
                    {generateQuizMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Loading Quiz...
                      </>
                    ) : (
                      "Start Quiz!"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {generateQuizMutation.isPending && (
          <Card className="bg-card border-border mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading your French quiz...</p>
                <p className="text-sm text-muted-foreground">Fetching quiz from our database...</p>
              </div>
            </CardContent>
          </Card>
        )}



        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">A focused quiz tool to master French verb tenses.</p>
        </div>
      </div>
    </div>
  );
}