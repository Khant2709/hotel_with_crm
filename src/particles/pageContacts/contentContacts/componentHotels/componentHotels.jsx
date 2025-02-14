import {formatPhoneWithMask} from "../../../../utils/mask/transfomNumber";
import {WrapperMail, WrapperPhone} from "../../../../components/ui/wrapperPhone/сontactLinks";

import styles from "./componentHotels.module.css";
import stylesFontsT from "../../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент отображения банера страницы Hotels.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.hotels - Массив отелей.
 * @returns {JSX.Element} - Компонент отображения банера.
 */
export const ComponentHotels = ({hotels}) => (
    <div className={styles.wrapperHotels}>
        {hotels.map(hotel => {
            return <div key={hotel.id} className={styles.cardHotel}>
                <div className={`${stylesFontsT.newRoman400} ${styles.containerInfo}`}>
                    <p className={styles.infoNameHotel}>{hotel.name}</p>

                    <p className={styles.infoSubtitle}>Телефон:</p>
                    <WrapperPhone phoneNumber={formatPhoneWithMask(hotel.phone)} telegramNumber={hotel.phone_tg}
                                  whatsAppNumber={hotel.phone}/>
                    <p className={styles.infoSubtitle}>Email:</p>
                    <WrapperMail email={hotel.email}/>
                    <p className={styles.infoSubtitle}>Адрес:</p>
                    <a href={hotel.link_to_ya_map}
                       target={'_blank'}
                       rel="noopener noopener">
                        {hotel.address}
                    </a>
                    <p className={styles.infoSubtitle}>Ссылка на отель:</p>
                    <a href={hotel.website}>{hotel.website}</a>
                </div>
                <iframe
                    src={hotel.code_iframe_map}
                    className={styles.map}
                    width="1280"
                    height="720"
                    frameBorder="0"/>
            </div>
        })}
    </div>
);
