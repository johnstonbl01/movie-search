# Movie Search

> Highlight something in your project that you thought was especially interesting or significant to your overall implementation.

As always, rendering lists in React can be landmine. I was grooving along, and realized I was rendering too many times, but didn't think I had enough time to debug what was causing the re-renders. Most likely it's the taxonomy of the component hierarchy for the `MovieList > MovieCard > MovieDetailDialog` that's causing the issue. I feel like I was able to get a lot of the functionality in the applicaiton in the alotted time, while still having an okay-ish design (thanks, Radix!).

> Tell us what you are most pleased or proud of with your implementation.

I created the pagination from scratch, and was pretty happy with how that part turned out. It's not very complicated, and "just works." I also like the little poster placeholder when one of the films doesn't have a `posterUrl`. I think small touches like this in other applications really demonstrate that the devs have accounted for missing data or errors, which I feel gets left by the wayside quite a bit.

> Given more time, what next feature or improvement would you like to add to your project?

So many things.

- Determine why the card details are rendering twice and address that issue
- I had plans to add a couple little funny flourishes to the design that I didn't get to. Namely, I had a simple idea for a logo with animation around the it when the page was loading. Additionally, I wanted to have the cards animate and flip over when you clicked on them, and then expand to show the details.
- Better error handling for parts where we're making API calls via `ErrorBoundaries`
- I was never super happy with the design of the skeleton loaders, so I'd try to improve that. I wanted to give an indication that it was loading, so I left them alone after tinkering for just a little bit.
- I wanted to use `Plaiceholder` to show blurred images of the poster while they loaded
- I didn't particularly like that I couldn't use the card itself as the `DialogTrigger` for the Radix Dialog (mostly because it's not a button, and I didn't create an abstraction using `forwardRef` for the `Card`), but I'd try to improve this, as I think it makes the code more readable.
- I'd reorganize the code inside the `MovieDetailDialog` to be more readable -- primarily would abstract some of the organizing components into smaller ones (like for the rating, and runtime) to make the code inside the component more declarative
- Improve the responsive design to make it look better on smaller devices