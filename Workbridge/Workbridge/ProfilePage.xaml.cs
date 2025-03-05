using System.Data.SQLite;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class ProfilePage : Page
    {
        public ProfilePage()
        {
            InitializeComponent();
        }

        private void SaveProfile(object sender, RoutedEventArgs e)
        {
            // Validate input fields
            if (string.IsNullOrWhiteSpace(FullNameBox.Text))
            {
                MessageBox.Show("Full Name is required.");
                return;
            }

            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();
                string query = @"
                    INSERT INTO Profile (
                        UserId, FullName, Department, WorkExperience, CurrentProjects, EducationLevel, Certifications, HardSkills, SoftSkills, Languages
                    ) VALUES (
                        @UserId, @FullName, @Department, @WorkExperience, @CurrentProjects, @EducationLevel, @Certifications, @HardSkills, @SoftSkills, @Languages
                    )";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    // Replace @UserId with the actual user ID (you need to retrieve it from the logged-in user)
                    cmd.Parameters.AddWithValue("@UserId", 1); // Example: Hardcoded for now
                    cmd.Parameters.AddWithValue("@FullName", FullNameBox.Text);
                    cmd.Parameters.AddWithValue("@Department", DepartmentBox.Text);
                    cmd.Parameters.AddWithValue("@WorkExperience", WorkExperienceBox.Text);
                    cmd.Parameters.AddWithValue("@CurrentProjects", CurrentProjectsBox.Text);
                    cmd.Parameters.AddWithValue("@EducationLevel", EducationLevelBox.Text);
                    cmd.Parameters.AddWithValue("@Certifications", CertificationsBox.Text);
                    cmd.Parameters.AddWithValue("@HardSkills", HardSkillsBox.Text);
                    cmd.Parameters.AddWithValue("@SoftSkills", SoftSkillsBox.Text);
                    cmd.Parameters.AddWithValue("@Languages", LanguagesBox.Text);

                    try
                    {
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Profile saved successfully!");
                    }
                    catch (SQLiteException ex)
                    {
                        MessageBox.Show($"Error saving profile: {ex.Message}");
                    }
                }
            }
        }
    }
}