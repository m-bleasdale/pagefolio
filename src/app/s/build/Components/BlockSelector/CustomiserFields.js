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
                type: 'image'
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
                displayName: 'Style of Social Media Icons',
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
    }
}

export default fields;