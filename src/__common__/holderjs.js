/*
* <img data-src="holder.js/300x200" />
* <img data-src="holder.js/300x200?theme=bright" />
* <img src="holder.js/300x200??theme=thumbnail" />
*/
import('holderjs')
  .then((Holder) => {
    Holder.addTheme('thumbnail', { bg: 'red', text: 'Thumbnail' });
    Holder.addTheme('bright', { bg: 'azure', fg: 'gray', size: 12 });
  });
