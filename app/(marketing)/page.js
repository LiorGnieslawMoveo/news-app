import logo from "@/assets/logo.jpg";
import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A football" />
      <h1>A News Site For The National Football League</h1>
      <p>
        Next NFL News is here to bring you all the latest updates from the world
        of football—concise and unbiased!
      </p>

      <p>
        Next NFL News aims to provide you with the most current NFL news in a
        clear and straightforward manner. We strive to keep you informed about
        your favorite teams, players, and games without overwhelming you with
        unnecessary details. Our focus is on delivering relevant information
        quickly and effectively.
      </p>

      <p>
        We have a team of dedicated sports journalists who are passionate about
        the NFL and committed to bringing you fair and balanced coverage. Our
        mission is to keep you up to date with the latest scores, trade rumors,
        and league developments, so you never miss a moment.
      </p>

      <p>
        <Link href="/news">Read the latest news</Link>
      </p>
    </div>
  );
}
