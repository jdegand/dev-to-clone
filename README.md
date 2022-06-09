# Dev.to Clone

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

This is based on this [tutorial](https://www.youtube.com/watch?v=njOk7y62dt0).  I didn't know Dev.to had an api and I was intrigued to see how to use it.  Watching the video, I thought react query would be perfect for this.  So I implemented the basic design with react query instead.  I made my hover card closer to the dev to design.  I didn't see much reason to use tailwind here so I avoided that.  I avoided installing packages for the minimal functionality gains they provided.  

### Screenshot 

![](dev-to-clone-mobile.png)

![](dev-to-clone-mobile-next-page.png)

![](dev-to-clone-desktop.png)

![](dev-to-clone-hover-card.png)

![](dev-to-clone-bottom-nav.png)


### Links

- Live Site URL: [Github Pages](https://jdegand.github.io/dev-to-clone)

## My process

### Built with

- [React](https://reactjs.org)
- [React Query](https://react-query.tanstack.com)
- [Dev.to API](https://developers.forem.com/api#operation/getArticles)
- [React Icons](https://react-icons.github.io/react-icons)

### Continued development

- Images did't span the whole article when width > 1400px (the images are smaller than viewport width).  So I added min-width 100% for images.  
- Random color background (on hover card) is crudely implemented.
- Semantics can be improved.  I used a lot of div wrappers.  
- Tab functionality for the hover card.  
- I originally used a hook for the useQuery request but I changed that later.  So I could try to convert back to a hook.  React query does seem to really on separate hooks for testing.   

### Useful resources

- [Tailwind](https://tailwindcss.com/docs/utility-first)
- [React Query](https://react-query.tanstack.com/examples/pagination) - pagination
- [Reddit](https://www.reddit.com/r/webdev/comments/klpm09/react_query_trying_to_do_pagination_but_getting/) - react query pagination
- [React Router](https://v5.reactrouter.com/web/guides/scroll-restoration) - scroll restoration
- [Blog](https://www.carlrippon.com/lazy-loading-with-react-query/) - lazy loading with react query
- [CSS Tricks](https://css-tricks.com/snippets/javascript/random-hex-color/#:~:text=var%20randomColor%20%3D%20Math.,random()*16777215).) - random color
- [Stack Overflow](https://stackoverflow.com/questions/53878153/randomly-change-the-background-color-of-a-react-app-by-a-click) - random bg color
- [Access Use](https://accessuse.eu/en/Content-hover-focus.html) - accessibility hover & focus problems