const fields = {
    'Header': {
        data: [
            {
                fieldName: 'TitleText',
                displayName: 'Page Title',
                type: 'short-text',
                required: true
            },
            {
                fieldName: 'SubTitleText',
                displayName: 'Subtitle',
                type: 'short-text'
            },
            {
                fieldName: 'LogoSource',
                displayName: 'Picture',
                type: 'page-logo'
            },
            {
                fieldName: 'Socials',
                displayName: 'Socials',
                type: 'socials'
            }
        ],
        options: [
            {
                fieldName: 'layout',
                displayName: 'Layout',
                type: 'options',
                required: true,
                options: [
                    { displayName: 'Horizontal', optionName: 'Horizontal' },
                    { displayName: 'Discrete', optionName: 'Vertical_Discrete' },
                    { displayName: 'Focus', optionName: 'Vertical_Logo_Focus' }
                ]
            },
            {
                fieldName: 'socials_variant',
                displayName: 'Social Media Icon Style',
                type: 'options',
                required: true,
                options: [
                    { displayName: 'Original', optionName: 'original', icon: '/build/PageFolioSocialOriginal.png' },
                    { displayName: 'Filled', optionName: 'filled', icon: '/build/PageFolioSocialFilled.png' },
                    { displayName: 'Outline', optionName: 'outline', icon: '/build/PageFolioSocialFilledCircle.png' }
                ]
            }
        ]
    },
    'About': {
        data: [
            {
                fieldName: 'TitleText',
                displayName: 'Title',
                type: 'short-text'
            },
            {
                fieldName: 'BodyText',
                displayName: 'Body Text',
                type: 'long-text',
                required: true
            }
        ],
        options: [
            {
                fieldName: 'align',
                displayName: 'Text Align',
                type: 'text-align',
                required: true
            },
            {
                fieldName: 'highlighted',
                displayName: 'Display Style',
                type: 'options',
                required: true,
                options: [
                    { displayName: 'Normal', optionName: 'false' },
                    { displayName: 'Highlighted', optionName: 'primary' },
                    { displayName: 'Highlighted (Minimal)', optionName: 'minimal' }
                ]

            }
        ]
    },
    'ButtonLink': {
        data: [
            {
                fieldName: 'ButtonText',
                displayName: 'Text',
                type: 'short-text',
                required: true
            },
            {
                fieldName: 'Link',
                displayName: 'Link',
                type: 'short-text',
                required: true
            },
            {
                fieldName: 'IconSource',
                displayName: 'Icon',
                type: 'icon',
            }
        ],
        options: [
            {
                fieldName: 'variant',
                displayName: 'Button Variant',
                type: 'options',
                required: true,
                options: [
                    { displayName: 'Primary', optionName: 'primary' },
                    { displayName: 'Minimal', optionName: 'minimal' },
                    { displayName: 'Bare', optionName: 'bare' }
                ]

            }
        ]
    },
    'Hero': {
        data: [
            {
                fieldName: 'TitleText',
                displayName: 'Title',
                type: 'short-text'
            },
            {
                fieldName: 'SubTitleText',
                displayName: 'Subtitle',
                type: 'short-text'
            },
            {
                fieldName: 'ImageSource',
                displayName: 'Image',
                type: 'image',
            }
        ],
        options: [
            {
                fieldName: 'TextAlign',
                displayName: 'Text Align',
                type: 'text-align',
                required: true
            }
        ]
    },
    'ImageWithText': {
        data: [
            {
                fieldName: 'TitleText',
                displayName: 'Title',
                type: 'short-text'
            },
            {
                fieldName: 'BodyText',
                displayName: 'Body',
                type: 'long-text',
                required: true
            },
            {
                fieldName: 'ImageSource',
                displayName: 'Image',
                type: 'image',
                required: true
            }

        ],
        options: [
            {
                fieldName: 'TextAlign',
                displayName: 'Text Align',
                type: 'text-align',
                required: true
            }
        ]

    }
}

export default fields;