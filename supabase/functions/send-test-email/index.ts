
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "https://esm.sh/resend@1.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, subject, content, testEmail } = await req.json()
    
    // Input validation
    if (!testEmail || !content || !subject) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    // Send test email
    const data = await resend.emails.send({
      from: 'Stage Rental <stage@resend.dev>',
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html: content,
    })

    console.log('Test email sent successfully:', data)

    return new Response(
      JSON.stringify({ message: 'Test email sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending test email:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send test email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
