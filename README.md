# focus-timer
A web app which, using the pomodoro concept, allows the user to set timing Intervals for focus and resting.
Wiesenstr. 70b, 40549 Düsseldorf
# Technologies
We start out with a simple html, css, javascript combo.
On top we add Toastify for easy and beautiful toast messages.
Since webapp will be used on mobile a notification would be nice.
So we are trying to use the Vibration API and see how it works.
To make the app to be able to send notifications to the OS we have to turn
it into a PWA(Progressive Web App). A PWA gives us the possibility to send
notifications, even when the website is not in the foreground.
For this to work we have to integrate a Service Worker into the Web App,
which is receiving the message send from the backend. ... Aiaiai!
