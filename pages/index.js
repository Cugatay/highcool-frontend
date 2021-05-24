import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/pages/Landing.module.scss';
import LandingHeader from '../components/LandingHeader';
import LandingInfo from '../components/LandingInfo';
import LandingQList from '../components/LandingQList';

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
          {/* <iframe src="https://www.youtube.com/embed/sUr4GBzEqNs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> */}

          {/* <img src="/screenshot.png" alt="Screenshot" className={styles.screenshot} /> */}

          <LandingQList questions={['Bu Site Ne Ulan?', 'Sitede Neler Yapılıyor?', 'Tam Gizlilik Mümkün Mü?', 'Tam Olarak Nasıl Çalışıyor?', 'Bizim Bilgilerimizin Gerçekten Gizlendiğini Nerden Bilebiliriz?', 'Maksat Gizlilikse Neden Kayıt Olurken E-postamızı Vermemiz Gerekiyor']} />

          <LandingInfo
            title="Bu Site Ne Ulan?"
            info="
              Kendini gizle, istediklerini söyle,
              istediğin kişilere kimliğini fısılda. Ve kime güvendiğine dikkat et!
            "
            hiddenInfo="Yıllarca gün yüzü görmemesine rağmen facebook.com'dan daha parlak bir gelecek sunan bu diyarlarda, eğer bir şey yanlışsa onu söylersin. Solder olmak bunu gerektirir. Solder, Prisold platformunu etrafındaki salak saçma olayların eleştirilmesini ve düzeltilmesini isteyerek kullan kişilere denir. Bu kişiler, etraflarını çevreleyen karanlığı yarıp geçme kabiliyetine sahiptirler. İstedikleri takdirde, istedikleri olayı kimliklerini açığa çıkarmaksızın paylaşıp eleştirebilirler. Yani kısaca, 2 ay boyunca sınav telaşı yaşayan bir öğrenciysen bu platform tam sana göre. Stresini bu salak sistemi eleştirerek dağıtabilirsin burada. Tabi küfretme ki hapse girmeyelim, değil mi yoldaş."
          />

          <LandingInfo title="Sitede Neler Yapılıyor?" info="Bu sitedeki en temel amaç, gönderi oluşturmak ve bu gönderileri kendinizi gizleyerek veya gizlemeden paylaşmak. Paylaştığınız bu gönderiler, eğer dikkat çekiciyse bir tartışma yaratacak ve insanlar gönderinin altında birbirleriyle gizli/açık bir şekilde yazışacak, dövüşecek. Eğer gönderini kendini gizleyerek paylaştıysan insanlar gönderinin sağ üstündeki butona tıklayarak kim olduğunu öğrenmek isteyecek, sana davet gönderecek." hiddenInfo="Burada dikkatli ol, kime güveneceğini sen seçiyorsun Prisolder!" />

          <LandingInfo
            title="Tam Gizlilik Mümkün Mü?"
            info="Tam gizlilik normal şartlarda internetin hiçbir yerinde mümkün değildir. Eline aldığın cihaz eğer internete bağlanabiliyorsa, etrafına ayak izleri saçarak ilerler. Fakat bu noktada, eğer girdiğiniz siteler gizliliğinizi koruma vaadi vermişse gizliliğiniz bu site tarafından yasal olarak korunmak zorundadır."
            hiddenInfo={`
              Bu vaadi veren bir platformu nasıl anlarız sorusuna gelirsek; bu tür platformlar insanların kişisel bilgilerini çalmadıklarını kanıtlayabilmek için kendi sitelerinin arka tarafında çalışan kodlarının tamamını paylaşırlar. Bendeniz ise sadece bu kodları paylaşmakla kalmıyor, sitenin açıldığı ilk günden beri siteye kodlanan bütün güncellemeleri tarihleriyle birlikte size github.com'dan sunuyorum. Dilerseniz sitenin gelişimini günbegün takip edebilirsiniz:
            `}
            github
          />

          <LandingInfo
            title="Tam Olarak Nasıl Çalışıyor?"
            info="
              Siteye kayıt olduktan sonra, insanlara paylaşacağınız her konuyu, her mesajı ve her yorumu eğer isterseniz gizleyebilirsiniz. Bir şeyi gizlemeye karar verdiğinizde, sizi tanımlayan ID'niz arka tarafta şifrelenir ve paylaştığınız içerik veritabanlarına bu şifre ile kaydedilir. İşin içine şifreleme algoritamaları girdiğinde, yazılım ve resmi yasalar arasında bir köprü kurulur. Yani eğer şifrelenmesi gereken bir şeyi şifrelemez, yada birisinin görebileceği bir biçimde yayınlarsanız şişeye oturtulursunuz (Anayasanın 331. Maddesi, Kullanıcıların Korunması Kanunu)
            "
            hiddenInfo="Bu tür şakalar bir yana, kullanıcıların güvenliğini ihlal etmek anayasa tarafından yıllar öncesinde kabul görmüş bir suçtur. Bunun yanında kullanıcının içeriklerini gizlice paylaşmasına özen gösteren Prisold platformu, bu şifrelemenin hangi adımlarla gerçekleştiğini açık kaynak bir biçimde paylaşmıştır. Gönlünüzce bu kodları inceleyebilir, fakat eğer kodlama çok sıkıcıysa direkt olarak sitemize kayıt olabilirsiniz"
            github
          />

          <LandingInfo title="Bizim Bilgilerimizin Gerçekten Gizlendiğini Nerden Bilebiliriz?" info="Yukarıda da söylendiği gibi, internette tam gizlilik mümkün değildir, internete bağlanabilen cihazlar ayak izleri oluşturarak hareket eder. Fakat gizlilik vaad eden platformlar bu ayak izlerini şifreler ve diğer kullanıcılara bu ayak izlerini paylaşmaz. Eğer maksadınız bu platformu hapse girmeden uyuşturucu satmak ise, Darkweb sizin için daha uygun bir yerdir. Fakat eğer etrafınızda olanları kimliğinizi gizleyerek paylaşmak isterseniz, Prisold sizin için mükemmel bir platformdur." />

          <LandingInfo title="Maksat Gizlilikse Neden Kayıt Olurken E-postamızı Vermemiz Gerekiyor" info="Bunu Çağatay Kaydır olarak cevaplamam gerekirse sevgili dostum, cevap çok basit: Siteyi açabilmek için sunucular satın aldım - Dolarla bide yani, bruh momento" hiddenInfo="Ve o kadar uğraşmışken sitenin çökmesini istemiyorum doğal olarak. Fakat eğer e-posta doğrulatmazsam bir kişi binlerce hesap açabilir. - Ama bunu engellemenin tek yolu e-posta doğrulaması mı yani? Diye sorarsan eğer hayır, önümde iki seçenek vardı: Telefon numarası doğrulama, e-posta doğrulama. Ve ben olsam kendi numaramı bana ne olursa olsun vermezdim :D Bunun yanı sıra, e-posta çok daha güvenli olduğundan dolayı bu yolu seçtim. Yani kısaca, e-posta daha güvenli bir yol olduğundan dolayı e-posta ile kayıt oluyorsun sevgili dostum <3" />
        </div>
      </main>

    </div>
  );
}
