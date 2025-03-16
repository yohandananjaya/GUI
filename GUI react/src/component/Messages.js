import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Messages.css";

function Messages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState({
    inbox: [
      { id: 1, from: "John Doe", subject: "Meeting Reminder", body: "Don't forget our meeting at 10 AM tomorrow." },
      { id: 2, from: "Jane Smith", subject: "Project Update", body: "Here's the latest update on the project." },
    ],
    outbox: [
      { id: 1, to: "John Doe", subject: "Follow-Up", body: "Just following up on our last discussion." },
    ],
    draft: [
      { id: 1, to: "Jane Smith", subject: "Proposal", body: "Here's the proposal for the new project." },
    ],
  });

  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const [activeTab, setActiveTab] = useState("inbox");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  const handleSendMessage = () => {
    if (newMessage.to && newMessage.subject && newMessage.body) {
      const message = {
        id: messages.outbox.length + 1,
        to: newMessage.to,
        subject: newMessage.subject,
        body: newMessage.body,
      };
      setMessages({
        ...messages,
        outbox: [...messages.outbox, message],
      });
      setNewMessage({ to: "", subject: "", body: "" }); // Clear the form
      alert("Message sent successfully!");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="home-container">
      {/* Left-Side Navigation Bar */}
      <div className="left-side-buttons">
        <h2 className="brand-name">WORKBRIDGE</h2>
        <NavLink to="/appointment/home" className="nav-button" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/appointment/wb" className="nav-button" activeClassName="active">
          WB
        </NavLink>
        <NavLink to="/appointment/table" className="nav-button" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/appointment/messages" className="nav-button" activeClassName="active">
          Messages
        </NavLink>

        {/* Log Out Button */}
        <button onClick={handleLogout} className="nav-button logout-btn">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="home-content">
        <h1>Messages</h1>

        {/* Tabs for Inbox, Outbox, Draft */}
        <div className="message-tabs">
          <button
            className={activeTab === "inbox" ? "active-tab" : ""}
            onClick={() => setActiveTab("inbox")}
          >
            Inbox
          </button>
          <button
            className={activeTab === "outbox" ? "active-tab" : ""}
            onClick={() => setActiveTab("outbox")}
          >
            Outbox
          </button>
          <button
            className={activeTab === "draft" ? "active-tab" : ""}
            onClick={() => setActiveTab("draft")}
          >
            Draft
          </button>
        </div>

        {/* Message List */}
        <div className="message-list">
          {activeTab === "inbox" &&
            messages.inbox.map((message) => (
              <div key={message.id} className="message-item">
                <h3>{message.subject}</h3>
                <p>From: {message.from}</p>
                <p>{message.body}</p>
              </div>
            ))}
          {activeTab === "outbox" &&
            messages.outbox.map((message) => (
              <div key={message.id} className="message-item">
                <h3>{message.subject}</h3>
                <p>To: {message.to}</p>
                <p>{message.body}</p>
              </div>
            ))}
          {activeTab === "draft" &&
            messages.draft.map((message) => (
              <div key={message.id} className="message-item">
                <h3>{message.subject}</h3>
                <p>To: {message.to}</p>
                <p>{message.body}</p>
              </div>
            ))}
        </div>

        {/* Send Message Form */}
        <div className="send-message-form">
          <h2>Send a Message</h2>
          <input
            type="text"
            placeholder="To"
            value={newMessage.to}
            onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subject"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
          />
          <textarea
            placeholder="Message"
            value={newMessage.body}
            onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Messages;