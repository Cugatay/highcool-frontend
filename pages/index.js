import React, { useEffect } from 'react';
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
      <main className={styles.main}>
        <LandingHeader />
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Bu Site Ne Ulan?</h3>
            <p>
              Kendini gizle, istediklerini söyle,
              istediğin kişilere kimliğini fısılda. Ve kime güvendiğine dikkat et!
            </p>
            <br />
            <p>Yıllarca gün yüzü görmemesine rağmen facebook.com'dan daha parlak bir gelecek sunan bu diyarlarda, eğer bir şey yanlışsa onu söylersin. Solder olmak bunu gerektirir. Solder, Prisold platformunu etrafındaki salak saçma olayların eleştirilmesini ve düzeltilmesini isteyerek kullan kişilere denir. Bu kişiler, etraflarını çevreleyen karanlığı yarıp geçme kabiliyetine sahiptirler. İstedikleri takdirde, istedikleri olayı kimliklerini açığa çıkarmaksızın paylaşıp eleştirebilirler. Yani kısaca, 2 ay boyunca sınav telaşı yaşayan bir öğrenciysen bu platform tam sana göre. Stresini bu salak sistemi eleştirerek dağıtabilirsin burada. Tabi küfretme ki hapse girmeyelim, değil mi yoldaş.</p>
            <p>Seni de aramızda görmekten mutluluk duyarız, Prisolder!</p>
          </div>

          <div className={styles.card}>
            <h3>Tam Gizlilik Mümkün Mü?</h3>
            <p>
              Tam gizlilik normal şartlarda internetin hiçbir yerinde mümkün değildir. Eline aldığın cihaz eğer internete bağlanabiliyorsa, etrafına ayak izleri saçarak ilerler. Fakat bu noktada, eğer girdiğiniz siteler gizliliğinizi koruma vaadi vermişse gizliliğiniz bu site tarafından yasal olarak korunmak zorundadır. Bu vaadi veren bir platformu nasıl anlarız sorusuna gelirsek; bu tür platformlar insanların kişisel bilgilerini çalmadıklarını kanıtlayabilmek için kendi sitelerinin arka tarafında çalışan kodlarının tamamını paylaşırlar. Bendeniz ise sadece bu kodları paylaşmakla kalmıyor, sitenin açıldığı ilk günden beri siteye kodlanan bütün güncellemeleri tarihleriyle birlikte size github.com'dan sunuyorum. Dilerseniz sitenin gelişimini günbegün takip edebilirsiniz:
            </p>

            <div className={styles.github}>
              <a href="https://github.com/Cugatay/highcool-backend" target="_blank" rel="noreferrer">https://github.com/Cugatay/highcool-backend</a>
            </div>
          </div>

          <div
            className={styles.card}
          >
            <h3>Tam Olarak Nasıl Çalışıyor?</h3>
            <p>
              Siteye kayıt olduktan sonra, insanlara paylaşacağınız her konuyu, her mesajı ve her yorumu eğer isterseniz gizleyebilirsiniz. Bir şeyi gizlemeye karar verdiğinizde, sizi tanımlayan ID'niz arka tarafta şifrelenir ve paylaştığınız içerik veritabanlarına bu şifre ile kaydedilir. İşin içine şifreleme algoritamaları girdiğinde, yazılım ve resmi yasalar arasında bir köprü kurulur. Yani eğer şifrelenmesi gereken bir şeyi şifrelemez, yada birisinin görebileceği bir biçimde yayınlarsanız şişeye oturtulursunuz (Anayasanın 331. Maddesi, Kullanıcıların Korunması Kanunu)
            </p>
            <p>Bu tür şakalar bir yana, kullanıcıların güvenliğini ihlal etmek anayasa tarafından yıllar öncesinde kabul görmüş bir suçtur. Bunun yanında kullanıcının içeriklerini gizlice paylaşmasına özen gösteren Prisold platformu, bu şifrelemenin hangi adımlarla gerçekleştiğini açık kaynak bir biçimde paylaşmıştır. Gönlünüzce bu kodları inceleyebilir, fakat eğer kodlama çok sıkıcıysa direkt olarak sitemize kayıt olabilirsiniz</p>
            <div className={styles.github}>
              Sitenin Kodları:
              {' '}
              <a href="https://github.com/Cugatay/highcool-backend" target="_blank" rel="noreferrer">https://github.com/Cugatay/highcool-backend</a>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Maksat Gizlilikse Neden Kayıt Olurken E-postamızı Vermemiz Gerekiyor</h3>
            <p>
              Bunu Çağatay Kaydır olarak cevaplamam gerekirse sevgili dostum, cevap çok basit: Siteyi açabilmek için sunucular satın aldım - Dolarla bide yani, bruh momento - ve o kadar uğraşmışken sitenin çökmesini istemiyorum doğal olarak. Fakat eğer e-posta doğrulamazsam bir kişi binlerce hesap açabilir. Fakat bunu engellemenin tek yolu e-posta doğrulaması mı yani? Diye sorarsan; hayır, önümde iki seçenek vardı: Telefon numarası doğrulama, e-posta doğrulama. Ve ben olsam kendi numaramı bana ne olursa olsun vermezdim :D Bunun yanısıra, e-posta çok daha güvenli olduğundan dolayı bu yolu seçtim. Yani kısaca, e-posta daha güvenli bir yol olduğundan dolayı e-posta ile kayıt oluyorsun sevgili dostum
              {' <3'}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
