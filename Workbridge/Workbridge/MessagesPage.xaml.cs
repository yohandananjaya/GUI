using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class MessagesPage : Page
    {
        public ObservableCollection<ChatItem> Conversations { get; set; }
        public ObservableCollection<MessageItem> Messages { get; set; }

        public MessagesPage()
        {
            InitializeComponent();

            // Sample Chats
            Conversations = new ObservableCollection<ChatItem>
            {
                new ChatItem { Sender = "Tharidu", LastMessage = "Hey, how are you?" },
                new ChatItem { Sender = "Supun", LastMessage = "Check this out!" },
                new ChatItem { Sender = "Kavinda", LastMessage = "Are we meeting today?" }
            };

            // Default Messages
            Messages = new ObservableCollection<MessageItem>
            {
                new MessageItem { Sender = "Ahinsa", Message = "Hey, how are you?" },
                new MessageItem { Sender = "You", Message = "I'm good, you?" }
            };

            ConversationsList.ItemsSource = Conversations;
            ChatMessages.ItemsSource = Messages;
        }

        private void SendButton_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(MessageInput.Text))
            {
                Messages.Add(new MessageItem { Sender = "You", Message = MessageInput.Text });
                MessageInput.Clear();
            }
        }

        private void ConversationsList_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Change messages based on selected chat (implement later)
        }
    }

    public class ChatItem
    {
        public string Sender { get; set; }
        public string LastMessage { get; set; }
    }

    public class MessageItem
    {
        public string Sender { get; set; }
        public string Message { get; set; }
    }
}
