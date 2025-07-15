import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { quizRequestSchema, type QuizRequest, type GeneratedQuiz } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Copy, CheckCircle, AlertCircle, GraduationCap, Languages, Settings, Code, Info, MessageCircleQuestion, Users, X, Lightbulb, Clock } from "lucide-react";

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

export default function Home() {
  const [quizResult, setQuizResult] = useState<QuizResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuizRequest>({
    resolver: zodResolver(quizRequestSchema),
    defaultValues: {
      verb: "",
      tense: "",
    },
  });

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
          description: `Created a 20-question quiz for "${data.quiz?.verb}" in ${data.quiz?.tense} tense.`,
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

  const tenseOptions = [
    { value: "present", label: "Présent (Present)" },
    { value: "passe_compose", label: "Passé Composé (Past Perfect)" },
    { value: "imparfait", label: "Imparfait (Imperfect)" },
    { value: "futur_simple", label: "Futur Simple (Simple Future)" },
    { value: "present_progressif", label: "Présent Progressif (Present Continuous)" },
    { value: "present_depuis", label: "Présent + depuis (Present Perfect Continuous)" },
    { value: "conditionnel_present", label: "Conditionnel Présent (Present Conditional)" },
    { value: "conditionnel_passe", label: "Conditionnel Passé (Conditional Perfect)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-french-blue" />
              <h1 className="text-xl font-semibold text-gray-900">French Verb Quiz Generator</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Languages className="h-4 w-4" />
              <span>Master French Verbs</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions Section */}
        <Card className="mb-8 bg-french-light border-french-blue/20">
          <CardHeader>
            <CardTitle className="text-lg text-french-blue flex items-center">
              <Info className="h-5 w-5 mr-2" />
              How to Use This Quiz Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Step 1: Enter a French Verb</h3>
                <p className="text-sm text-gray-700 mb-4">Type any French verb in its infinitive form (e.g., "faire", "avoir", "être")</p>
                
                <h3 className="font-medium text-gray-900 mb-2">Step 2: Select a Tense</h3>
                <p className="text-sm text-gray-700">Choose from 8 supported French tenses to practice</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What You'll Get</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center"><MessageCircleQuestion className="h-4 w-4 mr-2 text-french-blue" /> 20 multiple-choice questions</li>
                  <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-french-blue" /> All subject pronouns covered</li>
                  <li className="flex items-center"><X className="h-4 w-4 mr-2 text-french-blue" /> Negative sentences included</li>
                  <li className="flex items-center"><Lightbulb className="h-4 w-4 mr-2 text-french-blue" /> Hints and detailed rationales</li>
                  <li className="flex items-center"><Code className="h-4 w-4 mr-2 text-french-blue" /> JSON format for easy integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Generator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-french-blue" />
              Quiz Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="verb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        French Verb <span className="text-french-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., faire, avoir, être"
                            {...field}
                            className="pr-10"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Languages className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500">Enter the verb in its infinitive form</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        French Tense <span className="text-french-error">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tense..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tenseOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Choose the tense you want to practice</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Quiz Settings</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MessageCircleQuestion className="h-4 w-4 text-french-blue" />
                      <span className="text-gray-700">Questions: <strong>20</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-french-blue" />
                      <span className="text-gray-700">All pronouns covered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-french-blue" />
                      <span className="text-gray-700">4-5 negative sentences</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-french-blue" />
                      <span className="text-gray-700">Hints included</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={generateQuizMutation.isPending}
                    className="bg-french-blue hover:bg-blue-700 text-white font-medium py-3 px-8"
                  >
                    {generateQuizMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {generateQuizMutation.isPending && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-french-blue" />
                <p className="text-gray-600">Generating your personalized French quiz...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {generateQuizMutation.isError && (
          <Card className="mb-8 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Error Generating Quiz</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {generateQuizMutation.error?.message || "Please check your input and try again."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {quizResult?.success && quizResult.quiz && (
          <div>
            {/* Quiz Info */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="h-5 w-5 text-french-success mr-2" />
                    Quiz Generated Successfully
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={downloadQuiz}
                      className="bg-french-accent hover:bg-orange-600 text-white"
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
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4 text-french-blue" />
                    <span>Verb: <strong>{quizResult.quiz.verb}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-french-blue" />
                    <span>Tense: <strong>{quizResult.quiz.tense}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircleQuestion className="h-4 w-4 text-french-blue" />
                    <span>Questions: <strong>20</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JSON Output */}
            <Card>
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="font-medium text-gray-900 flex items-center">
                  <Code className="h-5 w-5 text-french-blue mr-2" />
                  Generated Quiz JSON
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                    <code>
                      {JSON.stringify(quizResult.quiz.questions, null, 2)}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Usage Examples */}
        <Card className="mt-12 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Usage Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Common Verbs to Try</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>être</strong> - to be
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>avoir</strong> - to have
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>faire</strong> - to do/make
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>aller</strong> - to go
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tense Examples</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>Présent:</strong> Je fais (I do)
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>Passé Composé:</strong> J'ai fait (I did)
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>Futur Simple:</strong> Je ferai (I will do)
                  </div>
                  <div className="bg-white rounded px-3 py-2 text-sm">
                    <strong>Conditionnel:</strong> Je ferais (I would do)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 French Verb Quiz Generator. Perfect for language learning and education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
