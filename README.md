# TuneIn Radio

This is a code challenge for TuneIn, implemented by Fabrizio Iacovone.

# Architecture

I have followed the precious guidelines in order to decouple the core functionality (the audio-player from the core folder) from the framework/libraries used to build the SPA.

I have considered not to need any Global State Management for this simple example, and preferred to keep the stations (once fetched) in the local state, and to apply memoized filtering on them based on the tag (genre) selected by the user.

I have separated the data fetching in a separate and reusable hook to bring out the logic from the main container component, which was already getting complicated in order to handle the numerous state updates. I tried to keep a good amount of component as purely presentational and to confine the logic in smart components, striving for some meaningful optimization to reduce the amount of rerendering.

I would have loved to invest time to write unit tests, but the time is precious and limited at the same time.

I have designed the app in order for it to be responsive.

I had some fun implementing the app and dedicating some time for animations (e.g. the marquee effect for the radio station description) which reminded me of an app I used to leverage a decade ago. It makes it a bit vantage, but I thought it could have looked great for mobile devices... however some more customization would be needed in terms of determining at run time the animation duration based on the description length.

# Notes

I tried to keep the challenge app simple this time, for one specific reason. In the recent past I had situations in which I have been told to have over-engineered the solutions for a simple challenge, and have been rejected. I would have done plenty of other choices in a real scenario, like thinking about providers for themes, data context to avoid drilling, library.. however I refrained myself from doing it as the challenge should take 3 hours.

So, yeah.. I hope you like it.
If so, I am glad. if not, I would like to sincerely thank you: I have learnt something new and it was fun!
Fabrizio

# PS Special thanks to ..

Special thanks to my wife for testing the app and giving me (silently) some extra thoughts on how to make the app more user-friendly
