
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = "videoplayer-current-time";
//Зберігаю час відтворення у локальне сховище. Ключем для сховища буде рядок "videoplayer-current-time".

const iframe = document.querySelector('iframe');
console.log(iframe)

const player = new Player(iframe);//ініціалізую плеєр

const onPlay = function (data) {
    console.dir(data)
    console.log(data.seconds)
    localStorage.setItem(STORAGE_KEY, data.seconds);
    //Зберігаю час відтворення у локальне сховище      
};

player.on('timeupdate', throttle(onPlay, 1000));
//відслідковую подію timeupdate 

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0);
//Під час перезавантаження сторінки скористалась методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.


/*HTML містить <iframe> з відео для Vimeo плеєра. Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.*/
