using System;
using System.Data.SQLite;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class ProfilePage : Page
    {
        private int _userId; // Store the logged-in user's ID

        public ProfilePage(int userId)
        {
            InitializeComponent();
            _userId = userId;
            LoadProfileData(); // Load profile data when the page is initialized
        }

        private void LoadProfileData()
        {
            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();
                string query = "SELECT * FROM Profile WHERE UserId = @UserId";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@UserId", _userId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Populate the form with existing profile data
                            DepartmentBox.Text = reader["Department"].ToString();
                            WorkExperienceBox.Text = reader["WorkExperience"].ToString();
                            CurrentProjectsBox.Text = reader["CurrentProjects"].ToString();
                            EducationLevelBox.Text = reader["EducationLevel"].ToString();
                            CertificationsBox.Text = reader["Certifications"].ToString();
                            HardSkillsBox.Text = reader["HardSkills"].ToString();
                            SoftSkillsBox.Text = reader["SoftSkills"].ToString();
                            LanguagesBox.Text = reader["Languages"].ToString();
                        }
                        else
                        {
                            // Clear fields if no profile is found (optional)
                            DepartmentBox.Text = "";
                            WorkExperienceBox.Text = "";
                            CurrentProjectsBox.Text = "";
                            EducationLevelBox.Text = "";
                            CertificationsBox.Text = "";
                            HardSkillsBox.Text = "";
                            SoftSkillsBox.Text = "";
                            LanguagesBox.Text = "";
                            MessageBox.Show("No profile found for this user.");
                        }
                    }
                }
            }
        }


        private void SaveProfile(object sender, RoutedEventArgs e)
        {
            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();

                // Check if the profile already exists
                string checkQuery = "SELECT COUNT(*) FROM Profile WHERE UserId = @UserId";
                using (var checkCmd = new SQLiteCommand(checkQuery, conn))
                {
                    checkCmd.Parameters.AddWithValue("@UserId", _userId);
                    int count = Convert.ToInt32(checkCmd.ExecuteScalar());

                    if (count > 0)
                    {
                        // Update existing profile
                        string updateQuery = @"
                    UPDATE Profile SET
                        Department = @Department,
                        WorkExperience = @WorkExperience,
                        CurrentProjects = @CurrentProjects,
                        EducationLevel = @EducationLevel,
                        Certifications = @Certifications,
                        HardSkills = @HardSkills,
                        SoftSkills = @SoftSkills,
                        Languages = @Languages
                    WHERE UserId = @UserId";

                        using (var updateCmd = new SQLiteCommand(updateQuery, conn))
                        {
                            updateCmd.Parameters.AddWithValue("@UserId", _userId);
                            updateCmd.Parameters.AddWithValue("@Department", DepartmentBox.Text);
                            updateCmd.Parameters.AddWithValue("@WorkExperience", WorkExperienceBox.Text);
                            updateCmd.Parameters.AddWithValue("@CurrentProjects", CurrentProjectsBox.Text);
                            updateCmd.Parameters.AddWithValue("@EducationLevel", EducationLevelBox.Text);
                            updateCmd.Parameters.AddWithValue("@Certifications", CertificationsBox.Text);
                            updateCmd.Parameters.AddWithValue("@HardSkills", HardSkillsBox.Text);
                            updateCmd.Parameters.AddWithValue("@SoftSkills", SoftSkillsBox.Text);
                            updateCmd.Parameters.AddWithValue("@Languages", LanguagesBox.Text);

                            updateCmd.ExecuteNonQuery();
                        }
                    }
                    else
                    {
                        // Insert new profile
                        string insertQuery = @"
                    INSERT INTO Profile (
                        UserId, Department, WorkExperience, CurrentProjects, EducationLevel, Certifications, HardSkills, SoftSkills, Languages
                    ) VALUES (
                        @UserId, @Department, @WorkExperience, @CurrentProjects, @EducationLevel, @Certifications, @HardSkills, @SoftSkills, @Languages
                    )";

                        using (var insertCmd = new SQLiteCommand(insertQuery, conn))
                        {
                            insertCmd.Parameters.AddWithValue("@UserId", _userId);
                            insertCmd.Parameters.AddWithValue("@Department", DepartmentBox.Text);
                            insertCmd.Parameters.AddWithValue("@WorkExperience", WorkExperienceBox.Text);
                            insertCmd.Parameters.AddWithValue("@CurrentProjects", CurrentProjectsBox.Text);
                            insertCmd.Parameters.AddWithValue("@EducationLevel", EducationLevelBox.Text);
                            insertCmd.Parameters.AddWithValue("@Certifications", CertificationsBox.Text);
                            insertCmd.Parameters.AddWithValue("@HardSkills", HardSkillsBox.Text);
                            insertCmd.Parameters.AddWithValue("@SoftSkills", SoftSkillsBox.Text);
                            insertCmd.Parameters.AddWithValue("@Languages", LanguagesBox.Text);

                            insertCmd.ExecuteNonQuery();
                        }
                    }

                    // Refresh UI with updated data
                    LoadProfileData();
                    MessageBox.Show("Profile saved successfully!");
                }
            }
        }

    }
}