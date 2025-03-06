
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import QuestionCard from "../components/QuestionCard";
import { users, questions } from "../data/mockData";
import { Question } from "../types";
import { MessageSquare, Edit } from "lucide-react";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const user = users.find(user => user.id === id);
  
  // Get questions by this user
  const userQuestions = questions.filter(q => q.author.id === id);
  
  // Get answers by this user
  const userAnswers: Question[] = [];
  questions.forEach(question => {
    if (question.answers.some(answer => answer.author.id === id)) {
      userAnswers.push(question);
    }
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="container max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The user profile you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6"
            >
              Return to Home
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
              
              <div className="mt-4">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary/10 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl border border-border p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Activity</h2>
                </div>
                
                <div className="flex border-b">
                  <button className="py-2 px-4 border-b-2 border-primary font-medium text-foreground">
                    Questions ({userQuestions.length})
                  </button>
                  <button className="py-2 px-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">
                    Answers ({userAnswers.length})
                  </button>
                </div>
              </div>
              
              {/* User Questions */}
              <div className="space-y-6">
                {userQuestions.length > 0 ? (
                  userQuestions.map(question => (
                    <QuestionCard key={question.id} question={question} />
                  ))
                ) : (
                  <div className="bg-muted/30 rounded-xl p-8 text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Questions Yet</h3>
                    <p className="text-muted-foreground">
                      This user hasn't asked any questions yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
