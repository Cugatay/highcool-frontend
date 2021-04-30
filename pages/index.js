import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/pages/Landing.module.scss';
import LandingHeader from '../components/LandingHeader';

export default function Landing() {
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      router.push('/home');
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LandingHeader />
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Bu sitede ne yapiliyor?</h3>
            <p>
              Kendini gizle, istediklerini soyle,
              istedigin kisilere kimligini fisilda. Ve kime guvendigine dikkat et!
            </p>
          </div>

          <div className={styles.card}>
            <h3>Tam gizlilik mumkun mu?</h3>
            <p>
              Tum gizli bilgiler saatler suren kodlama ve
              sifrelemelerle gizlendi. Ustelik gizli bir sey
              paylastigin zaman kimligini kendi sifren ile
              gizliyorsun, sitenin sahipleri dahil kim oldugunu anlayamiyor
            </p>
          </div>

          <div
            className={styles.card}
          >
            <h3>Tam olarak nasil calisiyor?</h3>
            <p>
              Oncelikle, hem gizli bir bilgiyi site sahiplerinin
              gorebilecegi bir sekilde kodlamak yasalara aykiri oldugundan
              hem de okulda Cagatay Zekeriyaberk diye dalga gecilmesinden
              korktugumdan dolayi bu verileri gizledigime emin olabilirsin.
              Fakat mantigini istersen de soyle ki: Kayit oldugunuzda kullandiginiz
              sifreler dedigim gibi hem yasalardan, hem de verilerinizi tutmayi daha
              kolay hale getirdiginden dolayi kayit oldugunuz anda sifrelenir. Ve bu sifreyi
              Highcool gizli bir sey paylasirken bir anahtar olarak kullanir.
              Ve biri sizle iletisim kurmak istedigi zaman, iletisim kurma istegi
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
