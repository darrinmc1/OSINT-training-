import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Eye, 
  Mail, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [step, setStep] = useState('email') // 'email' or 'code'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    // Simulate API call to send verification code
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, this would call your backend API
      console.log('Sending verification code to:', email)
      
      setSuccess('Verification code sent! Check your email.')
      setStep('code')
    } catch (err) {
      setError('Failed to send verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!code || code.length !== 4) {
      setError('Please enter the 4-digit verification code')
      return
    }

    setIsLoading(true)
    
    // Simulate API call to verify code
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would verify the code with your backend
      if (code === '1234') { // Demo code for testing
        setSuccess('Login successful! Welcome to OSINTAcademy.')
        setTimeout(() => {
          onLogin && onLogin({ email, verified: true })
        }, 1000)
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError('')
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess('New verification code sent!')
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold text-green-400 font-mono">OSINTAcademy</h1>
          </div>
          <p className="text-gray-300">
            {step === 'email' 
              ? 'Enter your email to access the academy' 
              : 'Enter the verification code sent to your email'
            }
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-green-400 bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {step === 'email' ? (
                <>
                  <Mail className="h-5 w-5 text-green-400" />
                  <span>Email Verification</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Security Code</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {step === 'email' 
                ? 'We\'ll send you a 4-digit code to verify your identity'
                : `Code sent to ${email}`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Error Alert */}
            {error && (
              <Alert className="mb-4 border-red-500 bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="mb-4 border-green-500 bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Email Step */}
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-400 text-black hover:bg-green-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      Send Verification Code
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Code Step */}
            {step === 'code' && (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code" className="text-gray-300">4-Digit Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="1234"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-center text-2xl tracking-widest"
                    maxLength={4}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    For demo purposes, use code: <span className="text-green-400 font-mono">1234</span>
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-400 text-black hover:bg-green-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Verify & Login
                    </>
                  )}
                </Button>

                <div className="flex flex-col space-y-2">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Resend Code
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setStep('email')
                      setCode('')
                      setError('')
                      setSuccess('')
                    }}
                    className="w-full text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Use Different Email
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="text-gray-400">
            <Shield className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-sm">Secure Access</p>
          </div>
          <div className="text-gray-400">
            <Eye className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-sm">Privacy Focused</p>
          </div>
          <div className="text-gray-400">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-sm">No Passwords</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            By logging in, you agree to our{' '}
            <a href="#" className="text-green-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-green-400 hover:underline">Privacy Policy</a>
          </p>
          <p className="mt-2">
            Need help? <a href="#" className="text-green-400 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

