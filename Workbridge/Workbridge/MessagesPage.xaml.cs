using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class MessagesPage : Page
    {
        public MessagesPage()
        {
            InitializeComponent();
            LoadMessages();
        }

        private void LoadMessages()
        {
            // Sample data for Inbox
            var inboxMessages = new List<ChatMessage>
            {
                new ChatMessage { Sender = "John Doe", Content = "Hey, how are you?", Timestamp = DateTime.Now.ToString("hh:mm tt") },
                new ChatMessage { Sender = "Jane Smith", Content = "Let's meet tomorrow.", Timestamp = DateTime.Now.ToString("hh:mm tt") }
            };

            // Sample data for Sendbox
            var sendboxMessages = new List<ChatMessage>
            {
                new ChatMessage { Receiver = "John Doe", Content = "I'm doing great!", Timestamp = DateTime.Now.ToString("hh:mm tt") },
                new ChatMessage { Receiver = "Jane Smith", Content = "Sure, let's meet at 10 AM.", Timestamp = DateTime.Now.ToString("hh:mm tt") }
            };

            // Bind the messages to the ListBoxes
            InboxList.ItemsSource = inboxMessages;
            SendboxList.ItemsSource = sendboxMessages;
        }

        private void SendMessage_Click(object sender, RoutedEventArgs e)
        {
            string messageContent = MessageInput.Text.Trim();

            if (!string.IsNullOrEmpty(messageContent))
            {
                // Add the message to the Sendbox
                var newMessage = new ChatMessage
                {
                    Receiver = "Recipient Name", // Replace with actual recipient logic
                    Content = messageContent,
                    Timestamp = DateTime.Now.ToString("hh:mm tt")
                };

                // Update the Sendbox
                var sendboxMessages = SendboxList.ItemsSource as List<ChatMessage>;
                sendboxMessages?.Add(newMessage);
                SendboxList.Items.Refresh();

                // Clear the input box
                MessageInput.Clear();
            }
            else
            {
                MessageBox.Show("Please enter a message.", "Error", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
    }

    // ChatMessage class to represent a message
    public class ChatMessage
    {
        public string Sender { get; set; } // For Inbox
        public string Receiver { get; set; } // For Sendbox
        public string Content { get; set; }
        public string Timestamp { get; set; }
    }
}