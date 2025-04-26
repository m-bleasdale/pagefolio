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
                displayName: 'Page Logo',
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
    }
}

export default fields;