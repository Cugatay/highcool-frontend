/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import LandingHeader from '../components/LandingHeader';
import styles from '../styles/pages/Landing.module.scss';

export default function Landing() {
  const router = useRouter();
  const token = Cookies.get('token');

  const data = [
    <span>Prisold’a Hoş Geldin Prisolder</span>,
    <span>Buradaki En Temel Amacın Kendini Gizleyerek İfade Etmektir</span>,
    <span>Kendini Gizleyerek Konu Başlıkları Oluşturabilirsin</span>,
    <span>Ve Bu Konu Başlıklarının Altında Yine Kendini Gizleyerek Tartışabilirsin</span>,
    <span>Her  Başlığın Altında İnsanlara Açık Bir Mesajlaşma Odası Bulunur</span>,
    <span>Bu Odalarda Konuyla İlgili Mesajlaşabilir ve Saatlerce Eğlenebilirsin</span>,
    <span>Bir Prisolder Olarak Bu Platformda Kendi Rolünü Belirlersin</span>,
    <span>Konu Başlıkları Bulmak İlgini Çekiyorsa En Popüler Başlıkları Yarat</span>,
    <span>Güncel Konular Hakkında Konuşmaktan Hoşlanıyorsan Başlıkların Altında Saatlerce Sohbet Edebilirsin</span>,
    <span>Kendini Gizleyen İnsanların Kim Olduğunu Araştıran Bir Kaşif Olmak İstiyorsan İnsanları Sözlerinle İkna Et</span>,
    <span>Bir Başlığı Oluşturan Kişi Kendini Gizlediyse, O Gönderinin Sağ Tarafında Bir Buton Belirir</span>,
    <span>Bu Butona Tıklayarak Başlığın Sahibine Kimliğini Öğrenmek İçin Davet Gönderebilirsin</span>,
    <span>Eğer Yazdığın Başlığa Gelen Bir Daveti Kabul Edersen, Bu Daveti Gönderen Kişi Kim Olduğunu Öğrenir</span>,
    <span>
      Kime Güveneceğine Sen Karar Ver
      <br />
      Ve Dikkatli Ol, Herkes Öldürür Sevdiğini
    </span>,
    <span>
      Eğer Aklında Sorular Varsa
      <Link href="/sss"> S.S.S (Sık Sorulan Sorular) Sayfasını </Link>
      Ziyaret Edebilirsin
    </span>,
    <span>Aklında Düşünceler Varsa, Prisold Bu Fikirleri Paylaşabilmen İçin Mükemmel Bir Platform</span>,
    <span>Çünkü Bu Platform Tamamen Gizlilik Üzerine Kurulmuştur ve Açık Kaynak Kodludur</span>,
    <span>Açık Kaynak Kodlu Platformlar Kar Amacı Gütmezler ve Kodları İnsanlar Tarafından İncelenebildiği İçin Verileri Güvendedir</span>,
    <span>
      Güvenlik İle İlgili Sorularınız
      <Link href="/sss"> S.S.S Sayfamızda </Link>
      Cevaplanmıştır, Ayrıcı Kaynak Kodumuza Buradan Ulaşabilirsiniz
    </span>,
    <span>Aklındaki Fikirleri İnsanlarla Güvenli Bir Şekilde Paylaşamya Bugün Başlayabilirsin</span>,
    <span>Kayıt Ol ve Bir Prisold Olarak Orta Dünyayı Kurtar! Unutma, Orta Dünyanın Kaderi Senin Ellerinde</span>,
  ];

  useEffect(() => {
    if (token) {
      router.push('/home');
    }
  }, []);
  return (
    <div className={styles.container}>
      <LandingHeader />

      <Carousel
        className={styles.carousel}
        showStatus={false}
        autoPlay
        showIndicators={false}
        showArrows={false}
        infiniteLoop
        showThumbs={false}
        // onChange={(i) => {
        //   console.log(i);
        // }}
      >
        {
          data.map((text) => (
            <div className={styles.item}>
              {text}
            </div>
          ))
        }
      </Carousel>
    </div>
  );
}
