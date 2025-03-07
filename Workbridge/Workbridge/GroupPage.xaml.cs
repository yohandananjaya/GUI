using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class GroupPage : Page
    {
        private List<string> _groups = new List<string>();  // List to store groups
        private List<string> _filteredGroups = new List<string>();  // For searching

        public GroupPage()
        {
            InitializeComponent();
            LoadGroups();
        }

        private void LoadGroups()
        {
            _groups = new List<string> { "Developers", "Marketing", "Design Team", "HR", "Project Managers" };
            _filteredGroups = new List<string>(_groups);
            RefreshGroupList();
        }

        private void RefreshGroupList()
        {
            GroupsList.ItemsSource = null;
            GroupsList.ItemsSource = _filteredGroups;
        }

        private void CreateGroup(object sender, RoutedEventArgs e)
        {
            string groupName = GroupNameBox.Text.Trim();
            if (!string.IsNullOrEmpty(groupName) && !_groups.Contains(groupName))
            {
                _groups.Add(groupName);
                _filteredGroups.Add(groupName);
                RefreshGroupList();
                GroupNameBox.Clear();
            }
            else
            {
                MessageBox.Show("Group name is invalid or already exists.", "Error", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        private void SearchGroups(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchBox.Text.Trim().ToLower();
            _filteredGroups = _groups.Where(g => g.ToLower().Contains(searchText)).ToList();
            RefreshGroupList();
        }
    }
}
