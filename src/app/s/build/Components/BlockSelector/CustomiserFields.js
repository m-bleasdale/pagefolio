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
                    { displayName: 'Vertical Discrete', optionName: 'Vertical_Discrete' },
                    { displayName: 'Vertical Logo Focus', optionName: 'Vertical_Logo_Focus' },
                ]
            },
            {
                fieldName: 'socials_variant',
                displayName: 'Social Media Icon Style',
                type: 'options',
                required: true,
                options: [
                    { displayName: 'Original', optionName: 'original' },
                    { displayName: 'Circle', optionName: 'original_circle' },
                    { displayName: 'Filled', optionName: 'filled' },
                    { displayName: 'Filled Circle', optionName: 'filled_circle' },
                    { displayName: 'Outline', optionName: 'outline' },
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
                type: 'text-align'
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