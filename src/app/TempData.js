const shell = {

    username: 'shell',

    meta: {
        title: "Shell Oil",
        description: "Powered by Pagefolio. We make oil, the right way."    
    },

    global: {
        backgroundColor: '#fdfdfd',
        altBackgroundColor: '#f4f4f4', //By default should be same as backgroundColor
        foreground: '#000000', //Mainly text
        foreground_onAlt: '#000000', //Foreground when background is alt color
        foreground_light: '#4D4D4D', //Not user input (30% lightened of foreground)
        foreground_light_onAlt: '#4D4D4D', //30% lightened of alt foreground
        primary: '#D52B1E', //Mainly used for buttons or icons
        foreground_onPrimary: '#ffffff', //Used when primary colour is a background and foreground colour is hard to see
        accent: '#f0f0f0', //Mainly used for secondary buttons or icons
        border: '1px solid #dddddd', //"none" if no border or "2px solid <color>"
        shadowsEnabled: false    
    },

    blocks: [
        {
            type: "Header",
            data: {
            TitleText: "Shell Oil Co",
            SubTitleText: "Est 1912",
            LogoSource: "https://gingersauce.co/wp-content/uploads/2020/12/pasted-image-0-2-3-1024x950.png",
            Socials: [
                {platform: 'Instagram', link: 'https://www.instagram.com/morgan.bleasdale/'},
                {platform: 'LinkedIn', link: 'https://www.linkedin.com/in/morgan-bleasdale-19b8402a9/'}
            ]
            },
            options: {
            layout: 'Vertical_Discrete',
            socials_variant: 'filled_circle'
            }
        },
        {
            type: "About",
            data: {
            TitleText: "About",
            BodyText: "The Shell General Business Principles are central to how we conduct our business and living by them is crucial to our continued success. We are judged by how we act and how we live up to our core values of honesty, integrity and respect for people. Our Business Principles are based on these. They promote trust, openness, teamwork and professionalism, as well as pride in what we do and how we conduct business."
            },
            options: {
            align: 'center',
            highlighted: false //false; 'minimal'; or 'primary';
            }
        },
        {
            type: "ButtonLink",
            data: {
            ButtonText: "The Shell Oil Promise",
            IconSource: 'document-graph'
            },
            options: {
            variant: "primary" //'minimal'; 'primary'; or 'bare'
            }
        },
        {
            type: "ButtonLink",
            data: {
            ButtonText: "Our 2025 Projections",
            IconSource: 'document-graph'
            },
            options: {
            variant: "minimal" //'minimal'; 'primary'; or 'bare'
            }
        },
        {
            type: "ButtonLink",
            data: {
            ButtonText: "Legal documentation for press",
            IconSource: 'document-graph'
            },
            options: {
            variant: "bare" //'minimal'; 'primary'; or 'bare'
            }
        },
        {
            type: "CardList",
            data: {
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
            },
            options: {
            align: 'center',
            layout: 'StackHorizontal'
            }
        }

    ]
    
}

const coffeeplanet = {

    username: 'coffeeplanet',

    meta: {
        title: "Coffee Planet",
        description: "Powered by Pagefolio. We make coffee, the right way."    
    },

    global: {
        backgroundColor: '#ffffff',
        altBackgroundColor: '#000000', //By default should be same as backgroundColor
        foreground: '#000000', //Mainly text
        foreground_onAlt: '#ffffff', //Foreground when background is alt color
        foreground_light: '#ffffff', //Not user input (30% lightened of foreground)
        foreground_light_onAlt: '#ffffff', //30% lightened of alt foreground
        primary: '#ffffff', //Mainly used for buttons or icons
        foreground_onPrimary: '#000000', //Used when primary colour is a background and foreground colour is hard to see
        accent: '#f0f0f0', //Mainly used for secondary buttons or icons
        border: '1px solid #dddddd', //"none" if no border or "2px solid <color>"
        shadowsEnabled: false    
    },

    blocks: [
        {
            type: "Header",
            data: {
            TitleText: "Coffee Planet",
            SubTitleText: "Newport Road, Cardiff",
            Socials: [
                {platform: 'Instagram', link: 'https://www.instagram.com/morgan.bleasdale/'},
                {platform: 'LinkedIn', link: 'https://www.linkedin.com/in/morgan-bleasdale-19b8402a9/'}
            ]
            },
            options: {
            layout: 'Horizontal',
            socials_variant: 'outline'
            }
        },
        {
            type: "CardList",
            data: {
            TitleText: "Why Coffee Planet?",
            Cards: [
                {
                TitleText: "Hand-crafted Hot Coffee",
                BodyText: "From the slopes of South America, to your coffee cup here in Cardiff.",
                Cover: {
                    Type: 'Image',
                    ImageSource: "https://coffeeplanet.com/wp-content/uploads/2023/08/1080X1080-01-1024x1024.jpg"
                }
                },
                {
                TitleText: "Delicious Warm Food",
                BodyText: "Baked with care by our specialist staff.",
                Cover: {
                    Type: 'Image',
                    ImageSource: "https://penllergare.org/wp-content/uploads/2024/06/IMG_1114-scaled-e1718291889645.jpg"
                }
                },
                {
                TitleText: "Coffee Planet's Own",
                BodyText: "We know so much about great coffee, that we even make our own beans.",
                Cover: {
                    Type: 'Image',
                    ImageSource: "https://coffeeplanet.com/wp-content/uploads/2023/08/coffee-beans-2022-11-02-18-14-58-utc-2048x1366.jpg"
                }
                }
            ]
            },
            options: {
            align: 'center',
            layout: 'StackHorizontal'
            }
        },
        {
            type: "About",
            data: {
            TitleText: "Everyone deserves a specialty experience",
            BodyText: "At Coffee Planet, we pride ourselves on making specialty coffee available at scale. Every palate deserves the right to indulge in a delicious brew that was earlier enjoyed only by a select few. This belief drives our product innovation, enhances our contribution to the larger value chain, and strengthens our partnerships along the way"
            },
            options: {
            align: 'left',
            highlighted: false //false; 'minimal'; or 'primary';
            }
        },
        {
            type: "ButtonLink",
            data: {
            ButtonText: "Visit our store",
            IconSource: 'document-graph'
            },
            options: {
            variant: "minimal" //'minimal'; 'primary'; or 'bare'
            }
        }
    ]
    
}


export {shell, coffeeplanet};