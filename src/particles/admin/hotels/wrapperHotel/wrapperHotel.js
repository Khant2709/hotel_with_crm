import React, {useMemo, useState} from 'react';

import ContainerCategory from "./containerCategory/containerCategory";
import ComponentFAQ from "./componentFAQ/componentFAQ";

import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";

import styles from './wrapperHotel.module.css'
import ComponentApartments from "./componentApartments/componentApartments";
import ComponentHotelAndContacts from "./componentHotelAndContacts/componentHotelAndContacts";

const WrapperHotel = ({hotel, updateHotelData}) => {
    const [activeCategory, setActiveCategory] = useState('');

    const isHotelOrContacts = useMemo(() => hotel && (activeCategory === 'hotel_data' || activeCategory === 'hotel_contacts'), [activeCategory])

    const updateData = async () => {
        await updateHotelData()
        setActiveCategory('')
    }

    return (
        <div className={styles.wrapperMain}>
            <TitleAdmin text={hotel?.name || 'Страница отеля'}/>
            <ContainerCategory setActiveCategory={setActiveCategory}/>
            {isHotelOrContacts &&
            <ComponentHotelAndContacts hotel={hotel} activeCategory={activeCategory} updateData={updateData}/>}
            {hotel && activeCategory === 'hotel_faq' &&
            <ComponentFAQ hotelId={hotel.id} setActiveCategory={setActiveCategory}/>}
            {hotel && activeCategory === 'hotel_apartments' &&
            <ComponentApartments hotelId={hotel.id} setActiveCategory={setActiveCategory}/>}
        </div>
    );
};

export default WrapperHotel;