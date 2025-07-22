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
import { Loader2, Download, Copy, CheckCircle } from "lucide-react";

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
  const [copied, setCopied] = useState(false);
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
      const response = await apiRequest("POST", "/api/generate-quiz", data);
      return response.json() as Promise<QuizResponse>;
    },
    onSuccess: (data) => {
      if (data.success) {
        setQuizResult(data);
        toast({
          title: "Quiz Generated Successfully",
          description: `Created a 20-question quiz for "${data.quiz?.verb}".`,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate quiz",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate quiz",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuizRequest) => {
    generateQuizMutation.mutate(data);
  };

  const downloadQuiz = () => {
    if (!quizResult?.quiz) return;
    
    const dataStr = JSON.stringify(quizResult.quiz.questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `french-verb-quiz-${quizResult.quiz.verb}-${quizResult.quiz.tense}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const copyToClipboard = async () => {
    if (!quizResult?.quiz) return;
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(quizResult.quiz.questions, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Quiz JSON copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const availableTenseTypes = watchTimeFrame ? TENSE_TYPES[watchTimeFrame as keyof typeof TENSE_TYPES] || [] : [];

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
                      <FormLabel className="text-lg font-medium text-white mb-3 block">
                        1. Choose a Verb
                      </FormLabel>
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
                      <FormLabel className="text-lg font-medium text-white mb-3 block">
                        2. Choose a Time Frame
                      </FormLabel>
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
                      <FormLabel className="text-lg font-medium text-white mb-3 block">
                        3. Choose a Tense to Test
                      </FormLabel>
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
                        Generating Quiz...
                      </>
                    ) : (
                      "Generate Quiz!"
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
                <p className="text-muted-foreground">Generating your personalized French quiz...</p>
                <p className="text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {quizResult?.success && quizResult.quiz && (
          <div>
            {/* Quiz Info */}
            <Card className="bg-card border-border mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Quiz Generated Successfully
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={downloadQuiz}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download JSON
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      variant="secondary"
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Verb: <strong className="text-white">{quizResult.quiz.verb}</strong></span>
                  <span className="mx-4">•</span>
                  <span>Tense: <strong className="text-white">{quizResult.quiz.tense}</strong></span>
                  <span className="mx-4">•</span>
                  <span>Questions: <strong className="text-white">20</strong></span>
                </div>
              </CardContent>
            </Card>

            {/* JSON Preview */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="bg-gray-900 rounded-lg">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-medium text-white">Generated Quiz JSON</h3>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-auto max-h-96">
                    {JSON.stringify(quizResult.quiz.questions, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">A focused quiz tool to master French verb tenses.</p>
        </div>
      </div>
    </div>
  );
}