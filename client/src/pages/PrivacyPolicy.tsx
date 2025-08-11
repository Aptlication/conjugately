import React from 'react';
import { Link } from 'wouter';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-lg text-slate-300">French Verb Master</p>
          <p className="text-sm text-slate-400 mt-2">Last updated: January 11, 2025</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">
              ← Back to App
            </button>
          </Link>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Welcome to French Verb Master!</h2>
            <p className="text-slate-300 leading-relaxed">
              We're excited to help you learn French! This privacy policy explains how we handle your information 
              when you use our app. We've written this in simple language so everyone, including young learners, 
              can understand how we protect your privacy.
            </p>
          </section>

          {/* What Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">What Information Do We Collect?</h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Learning Progress</h3>
                <p>We save your quiz scores and which lessons you've completed so you can pick up where you left off.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Account Information</h3>
                <p>If you create an account, we store your username and password securely. We don't ask for your real name, email, or personal details.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Usage Information</h3>
                <p>We track which features you use most to help us improve the app, but this information cannot identify you personally.</p>
              </div>
            </div>
          </section>

          {/* What We Don't Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">What We DON'T Collect</h2>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <ul className="space-y-2 text-slate-300">
                <li>• We don't ask for your real name, address, or phone number</li>
                <li>• We don't require an email address to use the app</li>
                <li>• We don't track your location</li>
                <li>• We don't access your camera, microphone, or photos</li>
                <li>• We don't share your information with other companies</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">How We Use Your Information</h2>
            <ul className="space-y-3 text-slate-300">
              <li>• <strong>Save your progress:</strong> So you can continue learning where you stopped</li>
              <li>• <strong>Improve the app:</strong> We look at which features are popular to make better lessons</li>
              <li>• <strong>Provide support:</strong> If something isn't working, we can help fix it</li>
              <li>• <strong>Keep the app secure:</strong> We protect against spam and misuse</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">How We Keep Your Information Safe</h2>
            <div className="space-y-4 text-slate-300">
              <p>We take security seriously and use industry-standard protection:</p>
              <ul className="space-y-2 ml-4">
                <li>• All data is encrypted (scrambled) so others can't read it</li>
                <li>• We use secure servers to store information</li>
                <li>• Only authorized team members can access data, and only when necessary</li>
                <li>• We regularly update our security measures</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Other Services We Use</h2>
            <div className="space-y-4 text-slate-300">
              <p>To make our app work well, we use some other trusted services:</p>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Google AI (Gemini)</h3>
                <p>We use Google's AI to create quiz questions. Google may see the questions we generate, but this doesn't include any of your personal information.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Database Storage</h3>
                <p>We use Neon (a secure database service) to store your progress safely.</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Your Rights and Choices</h2>
            <div className="space-y-4 text-slate-300">
              <p>You have control over your information:</p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Access:</strong> You can see all the data we have about you</li>
                <li>• <strong>Delete:</strong> You can ask us to delete your account and all your data</li>
                <li>• <strong>Correct:</strong> If something is wrong, you can ask us to fix it</li>
                <li>• <strong>Stop using:</strong> You can stop using the app anytime</li>
              </ul>
            </div>
          </section>

          {/* For Parents and Guardians */}
          <section className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">For Parents and Guardians</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                If your child is under 13, we recommend that you review this privacy policy with them 
                and supervise their use of the app.
              </p>
              <p>
                <strong>Child Safety:</strong> We don't collect personal information from children. 
                The app doesn't have chat features, social elements, or ways to contact other users.
              </p>
              <p>
                <strong>Educational Focus:</strong> The app is designed purely for learning French verbs. 
                All content is educational and age-appropriate.
              </p>
              <p>
                If you have questions about your child's use of the app or want to delete their data, 
                please contact us.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Cookies and Tracking</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                We use small files called "cookies" to remember your login and preferences. 
                These stay on your device and help the app work better for you.
              </p>
              <p>
                We don't use advertising cookies or track you across other websites.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Changes to This Policy</h2>
            <p className="text-slate-300">
              If we need to update this privacy policy, we'll post the new version here and update 
              the "last updated" date at the top. We'll also notify users of any major changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Questions or Concerns?</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                We're here to help! If you have questions about this privacy policy or how we handle 
                your information, please contact us.
              </p>
              <p>
                <strong>Remember:</strong> You can always delete your account and data by contacting us. 
                We'll respond to your request within 30 days.
              </p>
            </div>
          </section>

          {/* Simple Summary */}
          <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-200">Simple Summary</h2>
            <div className="space-y-2 text-slate-300">
              <p>✓ We only collect information needed to help you learn French</p>
              <p>✓ We keep your information safe and don't share it with others</p>
              <p>✓ You can delete your account and data anytime</p>
              <p>✓ We don't ask for personal details like your real name or email</p>
              <p>✓ The app is safe for children with parental guidance</p>
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-medium shadow-lg">
              Return to French Verb Master
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}