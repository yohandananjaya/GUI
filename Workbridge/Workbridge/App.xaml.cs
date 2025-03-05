using System;
using System.Diagnostics;
using System.Windows;

namespace Workbridge
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // Ensure the application terminates properly
            AppDomain.CurrentDomain.ProcessExit += CurrentDomain_ProcessExit;
        }

        private void CurrentDomain_ProcessExit(object sender, EventArgs e)
        {
            // Kill the process when the application exits
            try
            {
                Process.GetCurrentProcess().Kill();
            }
            catch (Exception ex)
            {
                // Log or handle the exception if needed
                Debug.WriteLine($"Error killing process: {ex.Message}");
            }
        }
    }
}