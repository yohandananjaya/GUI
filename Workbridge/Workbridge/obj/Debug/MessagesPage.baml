   M S B A M L   `   `   `  ����E  AWorkbridge, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:Workbridge
Workbridge  5          Workbridge.MessagesPage   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      *localclr-namespace:Workbridge     5        N� Title$  Messages��5       N� 
Background
 �����.��5      � ��5
   
   �� 5       �� ImageSource$- 'D:\Workbridge\images\modern-polygon.jpg��6    j� Stretch$ UniformToFill=�6O   .+�5   
   �  � ColumnDefinitions 5      �� 5      $	��250 �6#   �� 5      $��* �6#   .+�5      ��  �� CornerRadius$ 10��6    �� Padding$ 10q�6'   $��0��64   ��5      �� 5      $- 'D:\Workbridge\images\modern-polygon.jpg��6!   $ UniformToFill=�6W    �� Opacity$	 0.2Q�6o   ._�5      �� .+�5      �� $��CHATS��6    $��25(�6-   $
��Bold"�6;   $
��10,5q�6M   ���#1629386[   �� 5       -   5         ��Name$ ConversationsList��5    ,   	 J� Opacity$		 0.5Q�6   
������ ��5!      �� 5"      .R�5#   "   �� 
 �� Orientation$
 
Horizontal=�6-   $��5q�6F   .+�5$   &   A� $��40��6.   $��40��69   ���#1629386E   �� 5%   &   $��10,0,0,0q�61   .+�5&   *   �� $
��Bold"�6L   
���   ���64   �� *Sender+6^   �� 5'   *   $��12(�6Q   
���   ���64   �� *LastMessage+6_   5(   '   5)   #   5*      5,      5-      5.      �� 51      ���#162938$ 10��6*   $��1��6<   $ 10q�6L   $		 0.8Q�6Y   ._�52      �  � RowDefinitions 53      �� 54      $��* �6(   �� 56      $
��Auto �6(   .+�5;      �� $��0��6     �� RadiusX$ 10��6-    �� RadiusY$ 10��6:   ��5<      �� 5=      $- 'D:\Workbridge\images\modern-polygon.jpg��6)   $ UniformToFill=�6_   $	 0.8Q�6w   5?      �� 5B      $��0��6#   .��5C      �� -   5         ��Name$ ChatMessages��5C   '   ��5D      �� 5E   "   .R�5F   &   �� $��5q�61   .+�5G   *   �� $ 10q�5H   1   $ 10��6>   ��5G   1   �� *Sender+   MessageBubbleConverter �� 	Converter# [  ._�5I   .   �� ��68   �� *	Message+5J   +   5K   '   5L   #   5N      5O      ]� 5R      $��1��6    $��5q�6-   .+�5S      �� -   5         ��Name$ MessageInput��5S   "   $	��600��68   $��50,0,0,0q�6D   $��5q�6V   $��30��6b   �� 5T      -   5        $
��Send��5T   !   $	��100��6I   $��5,0,0,0q�6U   5U      5V      5W      5X      5Y      5Z      