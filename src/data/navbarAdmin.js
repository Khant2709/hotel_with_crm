import bookingIcon from '../../public/admin/booling.png';
import bookingUnconIcon from '../../public/admin/unconfirmed.png';
import checkInIcon from '../../public/admin/checkin.png';
import checkoutIcon from '../../public/admin/checkout.png';
import blogIcon from '../../public/admin/blog.png';
import hotelIcon from '../../public/admin/hotel.png';
import hotelMainIcon from '../../public/admin/hotelMain.png';
import financeIcon from '../../public/admin/finance.png';
import clientsIcon from '../../public/admin/clients.png';
import settingIcon from '../../public/admin/setting.png';
import docIcon from '../../public/admin/doc.png';
import createIcon from '../../public/editIcon.png';


export const navbarAdmin = [
  {id: 0, textRu: 'Создать бронь', link: '/create', icon: createIcon, isBoss: false},
  {id: 1, textRu: 'Все брони', link: '/booking/all', icon: bookingIcon, isBoss: false},
  {id: 2, textRu: 'Ожидающие брони', link: '/booking/unconfirmed', icon: bookingUnconIcon, isBoss: false},
  {id: 3, textRu: 'Заселение', link: '/booking/checkin', icon: checkInIcon, isBoss: false},
  {id: 4, textRu: 'Выселение', link: '/booking/checkout', icon: checkoutIcon, isBoss: false},

  {id: 5, textRu: 'Шикарный вид', link: '/hotel/1', icon: hotelIcon, isBoss: false},
  {id: 6, textRu: 'Бор О Дача', link: '/hotel/2', icon: hotelIcon, isBoss: false},
  {id: 7, textRu: 'Вижу море', link: '/hotel/3', icon: hotelIcon, isBoss: false},
  {id: 8, textRu: 'Сан Марина', link: '/hotel/4', icon: hotelIcon, isBoss: false},
  {id: 9, textRu: 'Общий сайт', link: '/hotel/5', icon: hotelMainIcon, isBoss: false},
  {id: 10, textRu: 'Блог', link: '/blog', icon: blogIcon, isBoss: false},

  {id: 11, textRu: '.Финансы', link: '/finance/auth', icon: financeIcon, isBoss: true},
  {id: 12, textRu: '.Клиенты', link: '/clients/auth', icon: clientsIcon, isBoss: true},
  {id: 13, textRu: '.Настройки', link: '/settings', icon: settingIcon, isBoss: true},
  {id: 14, textRu: 'Документация', link: '/doc', icon: docIcon, isBoss: false},
];