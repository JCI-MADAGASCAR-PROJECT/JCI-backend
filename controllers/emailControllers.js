import "dotenv/config";
import { z } from "zod";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
name: z.string().min(2).max(100),
email: z.string().email().max(254),
phone: z.string().min(10).max(15),
message: z.string().min(5).max(3000),
});

export const sendEmail = async (req, res) => {
    const { website } = req.body;
    if (website) {
        return res.status(400).json({
            message: "Requête invalide"
        });
    }
    
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
    return res.status(400).json({
        message: "Données invalides"
    });
    }
    const { name, email, phone, message } = result.data;
    try {
        const { data, error } = await resend.emails.send({
        from: "JCI MADAGASCAR <contact@contact.jcimadagascar.org>",
        to: ["contact@jcimada.org"],
        subject: `JCI - Nouveau message de contact `,
        html: `
            <div style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, Helvetica, sans-serif; color:#0C091E;">
                
                <div style="max-width:600px; margin:30px auto; background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5e5e5;">
                
                <!-- Header -->
                <div style="background-color:#0C091E; padding:24px 30px; text-align:center;">
                    <div style="color:#ffffff; font-size:22px; font-weight:bold; letter-spacing:1px;">
                    JCI MADAGASCAR
                    </div>
                    <div style="color:#E3D7B7; font-size:11px; margin-top:5px; letter-spacing:1.5px;">
                    Être le principal réseau mondial de jeunes leaders.
                    </div>
                </div>

                <!-- Title -->
                <div style="padding:25px 30px 10px;">
                    <h2 style="margin:0; color:#0C091E; font-size:20px;">
                    Nouveau message de contact
                    </h2>
                    <div style="width:45px; height:3px; background-color:#F2C94C; margin-top:10px;"></div>
                </div>

                <!-- Informations -->
                <div style="padding:15px 30px;">
                    
                    <p style="margin:10px 0; font-size:14px;">
                    <strong style="color:#0C091E;">Nom :</strong><br>
                    ${name}
                    </p>

                    <p style="margin:10px 0; font-size:14px;">
                    <strong style="color:#0C091E;">Email :</strong><br>
                    ${email}
                    </p>

                    <p style="margin:10px 0; font-size:14px;">
                    <strong style="color:#0C091E;">Téléphone :</strong><br>
                    ${phone}
                    </p>

                    <!-- Message -->
                    <div style="margin-top:20px; padding:18px; background-color:#f7f7f7; border-left:4px solid #F2C94C;">
                    <p style="margin:0 0 8px; font-size:14px; font-weight:bold; color:#0C091E;">
                        Message
                    </p>

                    <p style="margin:0; font-size:14px; line-height:1.6; color:#333333;">
                        ${message}
                    </p>
                    </div>

                </div>

                <!-- Footer -->
                <div style="background-color:#0C091E; padding:15px 30px; text-align:center;">
                    <p style="margin:0; color:#ffffff; font-size:11px;">
                    JCI Madagascar
                    </p>
                    <p style="margin:5px 0 0; color:#E3D7B7; font-size:10px;">
                    Ce message a été envoyé depuis le formulaire de contact du site.
                    </p>
                </div>
                </div>
            </div>
            `
        ,
        });

        if (error) {
            return res.status(400).json({ error });
        }
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};