   M S B A M L   `   `   `  ����W  SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35eDclr-namespace:System.Windows.Media.Effects;assembly=PresentationCoreSystem.Windows.Media.Effects  5       
Workbridge   Workbridge.ProfilePage   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml      5      XeffectsDclr-namespace:System.Windows.Media.Effects;assembly=PresentationCore      5        N� Title$  Profile Page��5       N� 
Background �#F9F9F9.��5      �  � RowDefinitions 5
   
   �� 5      $	��200 �6   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   ��5   
   �� 5       �� ImageSource$- 'D:\Workbridge\images\modern-polygon.jpg��6    j� Stretch$ UniformToFill=�6O    �� Opacity$	 0.8Q�6g   .+�5   
   �� $��0��6   
�������._�5      � .+�5      �� -   5         ��Name$ CoverPhotoImage��5      $��UniformToFill=�61   $6��0D:\Workbridge\images\blackone_holdings_cover.jpg��6I   �� 5      -   5        $��Change Cover Photo��5      $��Right=�5      $��Bottom=�5      $��10q�5      ���#0078D4
�������$��10q�5"      $��14(�5#      5$      5%      5&      �� 5)   
   $��1��6   $	��120��5*      $	��120��5+      
������� �� CornerRadius$ 60��5-      $��	0,-60,0,0q�5.      $��Center=�5/      $	��Top=�50      ���#E0E0E0$��2q�52      ._�53      � .+�55      A� ��56      �� 57      -   5        ProfilePhotoBrush��$ UniformToFill=�57   @   $' !D:\Workbridge\images\a21i0495.jpg��6X   59      �� 5:      -   5        $��Change��5:      $��Center=�5;      $��Bottom=�5<      $��	0,0,0,-20q�5=      ���#0078D4
�������$��5q�5@      $��12(�5A      5B      5C      5D      � 5G   
   $��2��6   $��20q�6    � ColumnDefinitions 5H      �� 5I      $��* �6#   �� 5J      $��* �6#   .+�5N      �� $��0��6   
�������$ 8��5P      	 �� Padding$	 17q�5Q      $��0,0,10,0q�5R      ���#E0E0E0$��1q�5T      
 J� Effect
 5U      3   -System.Windows.Media.Effects.DropShadowEffect  5V         Color$ Black��6/      Opacity$	 0.2Q�6=      
BlurRadius$ 10Q�6K      ShadowDepth$ 2Q�6[   ._�5X      �� .+�5Z      ��  �� Orientation$ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5[      �� $��	Full Name��6$   $��16(�65   $��SemiBold"�6C   ���#333333$��Center=�6n   $	��150��6�   �� 5\      -   5        $��DepartmentBox��5\   "   $��14(�67   $��8q�6E   $	��200��6Q   ���#F5F5F5���#E0E0E06r   5]      �� 5`      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5a      �� $��Work Experience��6$   $��16(�6;   $��SemiBold"�6I   ���#333333$��Center=�6t   $	��150��6�   �� 5b      -   5        $��WorkExperienceBox��5b   "   $��14(�6;   $��8q�6I   $	��200��6U   ���#F5F5F5���#E0E0E06v   5c      �� 5f      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5g      �� $��Current Projects��6$   $��16(�6<   $��SemiBold"�6J   ���#333333$��Center=�6u   $	��150��6�   �� 5h      -   5        $��CurrentProjectsBox��5h   "   $��14(�6<   $��8q�6J   $	��200��6V   ���#F5F5F5���#E0E0E06w   5i      �� 5l      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5m      �� $��Education Level��6$   $��16(�6;   $��SemiBold"�6I   ���#333333$��Center=�6t   $	��150��6�   �� 5n      -   5        $��EducationLevelBox��5n   "   $��14(�6;   $��8q�6I   $	��200��6U   ���#F5F5F5���#E0E0E06v   5o      �� 5r      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5s      �� $��Certifications��6$   $��16(�6:   $��SemiBold"�6H   ���#333333$��Center=�6s   $	��150��6�   �� 5t      -	   5        $��CertificationsBox��5t   "   $��14(�6;   $��8q�6I   $	��200��6U   ���#F5F5F5���#E0E0E06v   5u      5v      5w      �� 5z      $��1��6   
�������$ 8��5|      $	 17q�5}      $��	10,0,10,0q�5~      ���#E0E0E0$��1q�5�      
 5�        5�      $ Black��6/   $	 0.2Q�6=   $ 10Q�6K   $ 2Q�6[   ._�5�      �� .+�5�      �� $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5�      �� $��
Department��6$   $��16(�66   $��SemiBold"�6D   ���#333333$��Center=�6o   $	��150��6�   �� 5�      -
   5        $��NameBox��5�   "   $��14(�61   $��8q�6?   $	��200��6K   ���#F5F5F5���#E0E0E06l   5�      �� 5�      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5�      �� $��Hard Skills��6$   $��16(�67   $��SemiBold"�6E   ���#333333$��Center=�6p   $	��150��6�   �� 5�      -   5        $��HardSkillsBox��5�   "   $��14(�67   $��8q�6E   $	��200��6Q   ���#F5F5F5���#E0E0E06r   5�      �� 5�      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5�      �� $��Soft Skills��6$   $��16(�67   $��SemiBold"�6E   ���#333333$��Center=�6p   $	��150��6�   �� 5�      -   5        $��SoftSkillsBox��5�   "   $��14(�67   $��8q�6E   $	��200��6Q   ���#F5F5F5���#E0E0E06r   5�      �� 5�      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5�      �� $��	Languages��6$   $��16(�65   $��SemiBold"�6C   ���#333333$��Center=�6n   $	��150��6�   �� 5�      -   5        $��LanguagesBox��5�   "   $��14(�66   $��8q�6D   $	��200��6P   ���#F5F5F5���#E0E0E06q   5�      �� 5�      $ 
Horizontal=�6!   $��0,5,0,10q�6:   .+�5�      �� $��Birthday��6$   $��16(�64   $��SemiBold"�6B   ���#333333$��Center=�6m   $	��150��6�   (  "System.Windows.Controls.DatePicker  5�      -   5        $��BirthdayPicker��5�   %   $��14(�6;   $��8q�6I   $	��200��6U   ���#F5F5F5���#E0E0E06v   5�      5�      5�      5�      �� 5�   
   $��3��6   $��Center=�6"   $��Bottom=�6?   $��	0,20,0,20q�6Z   .+�5�      �� -   5        $��Save Profile��5�      $	��200��5�      $��10q�5�      ���#0078D4
�������$��16(�5�      $
��Bold"�5�      
������ 5�      5�      5�      5�      