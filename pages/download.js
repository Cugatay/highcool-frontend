/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import Button from '../components/ui/Button';
import styles from '../styles/pages/Download.module.scss';

export default function download() {
  return (
    <div className={styles.container}>
      <h1>Yeniden Merhaba!</h1>

      <h2>Galiba uygulamayı indirmek istiyorsun, huh?</h2>

      <h3>Fakat uygulama şuanda Google Play'de onay sürecinde</h3>

      {/* <h3>
        Ancak uygulamayı indirmek, bu diyarlarda
        gezintiye çıkarken işini çok daha kolay hale getirecek
      </h3>

      <h3>Ve uygulamayı indirmek için bir yöntem var</h3> */}

      <h3>Aşağıdaki butona tıklayabilirsin! Karşılığında bir apk dosyası telefonuna inecek</h3>

      <h3>Fakat eğer bunu yapmak istemezsen seni anlayışla karşılarım</h3>

      <h3>
        Bu dönemde kimse kimseye güvenemiyor değil mi?
        (dudaklarına hafif bir tebessüm kondurur)
      </h3>

      <h3>Hadi kolay gele!</h3>

      <Link href="/Prisold.apk">
        <Button type="button">Tıkla Hele</Button>
      </Link>
    </div>
  );
}
