import { dbGetAllMessages } from "../../lib/repositories/contact.repo";

export default async function MessagesPage() {
  const [messages] = await Promise.all([
    dbGetAllMessages()
  ]);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message: { id: string; email: string }) => (
          <li key={message.id}>{message.email}</li>
        ))}
      </ul>
    </div>
  );
}