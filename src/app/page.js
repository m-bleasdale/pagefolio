import styles from "@/app/styles/page.module.css";
import Header from "@/blocks/Header/Header";
import About from "@/blocks/About/About";
import CardList from "@/blocks/CardList/CardList";
import ButtonLink from "@/blocks/ButtonLink/ButtonLink";

const global = {
  backgroundColor: '#fdfdfd',
  altBackgroundColor: '#f4f4f4', //By default should be same as backgroundColor
  foreground: '#000000', //Mainly text
  foreground_light: '#4D4D4D', //Not user input (30% lightened of foreground)
  primary: '#D52B1E', //Mainly used for buttons or icons
  foreground_onPrimary: '#ffffff', //Used when primary colour is a background and foreground colour is hard to see
  accent: '#f0f0f0', //Mainly used for secondary buttons or icons
  border: '1px solid #dddddd', //"none" if no border or "2px solid <color>"
  shadowsEnabled: false,
}

export default function Home() {
  return (
    <div 
    className={styles.page}
    style={{backgroundColor: global.backgroundColor}}
    >
      <div className={styles.main}>
        <Header 
          data={{
            TitleText: "Shell Oil Co",
            SubTitleText: "Est 1912",
            LogoSource: "https://gingersauce.co/wp-content/uploads/2020/12/pasted-image-0-2-3-1024x950.png",
            Socials: [
              {platform: 'Instagram', link: 'https://www.instagram.com/morgan.bleasdale/'},
              {platform: 'LinkedIn', link: 'https://www.linkedin.com/in/morgan-bleasdale-19b8402a9/'}
            ]
          }}
          options={{
            layout: 'Vertical_Discrete',
              socials_style: {
                  variant: 'filled_circle'
              }
          }}
          global={global}
        />
        <About
          data={{
            TitleText: "About",
            BodyText: "The Shell General Business Principles are central to how we conduct our business and living by them is crucial to our continued success. We are judged by how we act and how we live up to our core values of honesty, integrity and respect for people. Our Business Principles are based on these. They promote trust, openness, teamwork and professionalism, as well as pride in what we do and how we conduct business.",
            AboutImage: "https://www.shell.co.uk/business/oil-and-gas/north-sea-operated-assets/_jcr_content/root/metadata.shellimg.jpeg/1704067393848/gannet-platform-in-the-north-sea.jpeg"
          }}
          options={{
            align: 'center',
            highlighted: false //false; 'minimal'; or 'primary';
          }}
          global={global}
        />
        <ButtonLink
          data={{
            ButtonText: "The Shell Oil Promise",
            IconSource: 'document-graph'
          }}
          options={{
            variant: "primary" //'minimal'; 'primary'; or 'bare'
          }}
          global={global}
        />
        <ButtonLink
          data={{
            ButtonText: "Our 2025 Projections",
            IconSource: 'document-graph'
          }}
          options={{
            variant: "minimal" //'minimal'; 'primary'; or 'bare'
          }}
          global={global}
        />
        <ButtonLink
          data={{
            ButtonText: "Legal documentation for press",
            IconSource: 'document-graph'
          }}
          options={{
            variant: "bare" //'minimal'; 'primary'; or 'bare'
          }}
          global={global}
        />
        <CardList
          data={{
            TitleText: "News",
            Cards: [
              {
                TitleText: "Shell Oil Shareholder Meeting",
                BodyText: "Our annual gala for shareholders to be held in New York",
                Cover: {
                  Type: 'Date',
                  Date: new Date()
                },
                clickable: 'clickable'
              },
              {
                TitleText: "New Approach to Climate Goals 2025",
                BodyText: "The Shell General Business Principles are central to how we conduct our",
                Cover: {
                  Type: 'Image',
                  ImageSource: "https://d1haa5elnw3u00.cloudfront.net/Pictures/480xany/2/0/2/319202_shelllogo_8834.jpg"
                },
                clickable: 'clickable'
              },
              {
                TitleText: "Gas Station",
                BodyText: "The Shell General Business Principles are central to how we conduct our",
                Cover: {
                  Type: 'Image',
                  ImageSource: "https://d1haa5elnw3u00.cloudfront.net/Pictures/480xany/2/0/2/319202_shelllogo_8834.jpg"
                }
              },
              {
                TitleText: "Gas Station",
                BodyText: "Powering your journeys",
                Cover: {
                  Type: 'Image',
                  ImageSource: "https://d1haa5elnw3u00.cloudfront.net/Pictures/480xany/2/0/2/319202_shelllogo_8834.jpg"
                }
              },
              {
                TitleText: "Gas Station",
                BodyText: "The Shell General Business Principles are central to how we conduct our",
                Cover: {
                  Type: 'Image',
                  ImageSource: "https://d1haa5elnw3u00.cloudfront.net/Pictures/480xany/2/0/2/319202_shelllogo_8834.jpg"
                }
              }
            ]
          }}
          options={{
            align: 'center',
            layout: 'StackHorizontal'
          }}
          global={global}
        />
      </div>
    </div>
  );
}

/*
<Header 
        data={{
          TitleText: "Shell Oil Co",
          LogoSource: "https://gingersauce.co/wp-content/uploads/2020/12/pasted-image-0-2-3-1024x950.png",
          Socials: [
            {platform: 'Instagram', link: 'https://www.instagram.com/morgan.bleasdale/'},
            {platform: 'LinkedIn', link: 'https://www.linkedin.com/in/morgan-bleasdale-19b8402a9/'}
          ]
        }}
        options={{
          layout: 'Vertical_Logo_Focus',
            socials_style: {
                variant: 'filled_circle'
            }
        }}
        global={global}
      />

      <About
        data={{
          TitleText: "About",
          BodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        }}
        options={{
          title_style: {align: 'center'},
          paragraph_style: {align: 'center'}
        }}
        global={global}
      />
*/