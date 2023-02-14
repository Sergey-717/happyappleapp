import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import Link from "next/link";
import styles from "../styles/Home.module.less";
import { Collapse, Text } from "@nextui-org/react";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <Link className={styles.footer__links__button} href="tel:79159302244">
          <PhoneInTalkRoundedIcon sx={{ fontSize: "70px", color: "#9c27b0" }} />
          <h4>Телефон</h4>
        </Link>
        <Link
          className={styles.footer__links__button}
          href="https://wa.me/79159302244"
        >
          <WhatsAppIcon sx={{ fontSize: "70px", color: "#9c27b0" }} />
          <h4>Whats App</h4>
        </Link>
        <Link
          className={styles.footer__links__button}
          href="https://t.me/vladimirhappy"
        >
          <TelegramIcon sx={{ fontSize: "70px", color: "#9c27b0" }} />
          <h4>Telegram</h4>
        </Link>
        <Link
          className={styles.footer__links__button}
          href="https://vk.com/happyapplerus"
        >
          <img src="/vkontakte.svg" width={70} />
          <h4>Вконтакте</h4>
        </Link>
        <div className={styles.footer__links__info}>
          Copyright © 2017 - {new Date().getFullYear()}
          <br />
          Happy Apple
          <br />
          All rights reserved.
        </div>
      </div>
      <div className={styles.footer__text}>
        <Collapse.Group id="collapse">
          <Collapse
            id="collapse1"
            title="Описание устройств"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse11">
              Все устройства либо новые, либо оригинал б/у, каждое устройство с
              гарантией, это либо официальная гарантия, либо, если она
              закончилась, гарантия от меня лично!
            </Text>
          </Collapse>
          <Collapse
            id="collapse2"
            title="Бесплатно при покупке"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse21">
              К каждому телефону в подарок чехол и защитное стекло, а так же
              перенос данных и установка приложений
            </Text>
          </Collapse>
          <Collapse
            id="collapse3"
            title="Что касается цен"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse31">
              В связи с нестабильным курсом доллара, цены могут меняться.
            </Text>
          </Collapse>
          <Collapse
            id="collapse4"
            title="Как связаться"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse41">
              Для быстрой связи: Whats App, VK, только текстовые сообщения,
              аудио звонок по договоренности.
            </Text>
          </Collapse>
          <Collapse
            id="collapse5"
            title="Доставка"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse51">
              Доставка по НН бесплатно, Бор доставка 500₽,
              Кстово/Дзержинск/Городец доставка 1,500₽ доставка возможна, если у
              меня есть окно до Вас доехать, более дешевый вариант доставки СДЭК
              стоит для негабаритных грузов 350₽, 90% такую доставку получите на
              следующий день, груз можем дополнительно застраховать, по Вашему
              желанию. Отправляю 3-4 раза в неделю, можно не переживать все
              доедет отлично.
            </Text>
          </Collapse>
          <Collapse
            id="collapse6"
            title="Гарантия"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse61">
              На НОВЫЕ iPhone НЕ РОСТЕСТ ОФИЦИАЛЬНОЙ ГАРАНТИИ НЕТУ! На
              iPad/MacBook/Watch/Airpods пока она действует! Ростест телефоны не
              поставляются в Россию с начала марта в связи с СВО, Apple
              прекратила поставки, поэтому все телефоны сейчас не Ростест, в
              списке можно найти Ростест, но это последние остатки, можно найти
              и другие модели на остатках у поставщиков, но готовьтесь заплатить
              за него гораздо большие деньги!
            </Text>
          </Collapse>
          <Collapse
            id="collapse7"
            title="Оплата"
            className={styles.footer__text__collapse}
          >
            <Text id="collapse71">
              Оплата: -наличными -перевод на карту (Сбербанк, Альфа Банк,
              Тиньков, ВТБ) - оплата картой, через терминал (комиссия 5%) Также
              есть возможность оформить технику в кредит: (От 3 до 36 месяцев,
              18% минимальный процент, он индивидуален для каждого но минимум
              18%, меньше пока нету, если банки снизят его, информацию обновлю,
              возраст от 21 года, гражданство РФ, хорошая кредитная история или
              ее отсутсвие, в базе около 10 банков, наш кредитный специалист по
              честному все расскажет о переплате, и комиссиях если они есть, не
              навязываем допы, не заставляем выбрать неликвидный товар,
              покупаете что нужно, с кредитом также работает trade in, пример:
              выбрали телефон за 50 тысяч, старый оценили к примеру в 15, кредит
              на 35 тысяч оформляется, не каких схем, все просто, прозрачно
              честно, специалист работает 5-6 дней в неделю, ТОЛЬКО личное
              присутствие, подача заявки возможна с 10.00 до 17.00, удаленно
              подача заявки НЕВОЗМОЖНА такие условия банков) (Доехать нужно
              будет до Советского района, недалеко от Жар Птицы адрес пришлю в
              личные сообщения) Также можно оплатить кредитной картой через
              терминал, но нужно доехать будет до терминала, нашего партнера
              (Советский район, недалеко от Жар Птицы) Комиссия будет 5% и это
              не нам деньги, 4% берет банк за эквайринг, 1% с меня берет
              партнер, и также работает Trade in, пример: телефон стоит 50к,
              старый телефон оценили в 15к, с Вас доплата 35.000₽ +5%, итого
              через терминал с Вас оплата 36.750₽
            </Text>
          </Collapse>
        </Collapse.Group>
      </div>
    </div>
  );
};
