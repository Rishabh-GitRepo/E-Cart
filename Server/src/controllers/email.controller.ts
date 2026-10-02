import { Request, Response } from "express";
import { sendEmail } from "../utils/mailer";

import nodemailer from "nodemailer";

// send mail for contact page
export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required",
      });
    }

    const receiverEmail = process.env.EMAIL_USER;

    if (!receiverEmail) {
      return res.status(500).json({
        message: "Email receiver is not configured",
      });
    }

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail(receiverEmail, `Contact: ${subject}`, html, email);

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (err: any) {
    let message = "Failed to send message";

    if (err?.code === "EAUTH") {
      message = "Email authentication failed. Check EMAIL_USER and EMAIL_PASS";
    } else if (err?.code === "EDNS" || err?.code === "ENOTFOUND") {
      message =
        "Unable to reach Gmail SMTP server. Check internet/DNS on backend";
    } else if (typeof err?.message === "string" && err.message.trim()) {
      message = err.message;
    }

    return res.status(500).json({
      message,
    });
  }
};




const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (
  email: string,
  order: any
) => {

  const deliveryDate =
    new Date(order.estimatedDeliveryDate)
      .toLocaleDateString("en-IN");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,

    subject: `Order Confirmed - ${order._id}`,

    html: `
      <h2>Order Confirmed 🎉</h2>

      <p>Thank you for your order.</p>

      <h3>Order Details</h3>

      <p>
        <strong>Order ID:</strong>
        ${order._id}
      </p>

      <p>
        <strong>Payment:</strong>
        Cash on Delivery
      </p>

      <p>
        <strong>Total:</strong>
        LKR ${order.totalAmount}
      </p>

      <p>
        <strong>Estimated Delivery:</strong>
        ${deliveryDate}
      </p>

      <p>
        Your order has been confirmed and will be
        delivered to:
      </p>

      <p>${order.shippingAddress}</p>

      <br />

      <p>Thank you for shopping with us!</p>
    `,
  });
};