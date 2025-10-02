class EmailExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'emailExtension',
            name: 'Email Sender',
            blocks: [
                {
                    opcode: 'sendEmail',
                    blockType: 'command',
                    text: 'send email to [TO] with subject [SUBJECT] and message [MESSAGE]',
                    arguments: {
                        TO: { type: 'string', defaultValue: 'example@example.com' },
                        SUBJECT: { type: 'string', defaultValue: 'Hello!' },
                        MESSAGE: { type: 'string', defaultValue: 'This is a test email.' }
                    }
                }
            ]
        };
    }

    async sendEmail(args) {
        const { TO, SUBJECT, MESSAGE } = args;

        try {
            const response = await fetch('https://your-service.onrender.com/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: TO,
                    subject: SUBJECT,
                    message: MESSAGE
                })
            });

            if (!response.ok) {
                console.error('Email failed:', await response.text());
            } else {
                console.log('Email sent successfully');
            }
        } catch (err) {
            console.error('Error sending email:', err);
        }
    }
}

Scratch.extensions.register(new EmailExtension());
