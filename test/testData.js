let data = {
    AST: {
        comments: {
            oneBlock: {
                twoTags: {
                    "comments": [
                        {
                            "type": "Block",
                            "value": "*\n * @class structure.fileE\n *\n * @define structure.fileC\n *\n "
                        }
                    ]
                }
            },
            twoBlocks: {
                twoTags: {
                    "comments": [
                        {
                            "type": "Block",
                            "value": "*\n * @class structure.fileE\n *\n * @define structure.fileC\n *\n "
                        },
                        {
                            "type": "Block",
                            "value": "*\n * @class structure.fileE\n *\n * @define structure.fileC\n *\n "

                        }
                    ]
                }
            },
            threeBlocks: {
                withEmptyBlock: {
                    "comments": [
                        {
                            "type": "Block",
                            "value": "*\n * @class structure.fileE\n *\n * @define structure.fileC\n *\n "
                        },
                        {
                            "type": "Block",
                            "value": "*\n * @class structure.fileE\n *\n * @define structure.fileC\n *\n "

                        },
                        {
                            "type": "Block",
                            "value": "* a"

                        }
                    ]
                }
            },
            oneLine: {
                twoTags: {
                    "comments": [
                        {
                            "type": "Line",
                            "value": "@require structure.fileE @require structure.fileD"
                        }
                    ]
                }
            },
            twoLines: {
                twoTags: {
                    comments: [
                        {
                            "type": "Line",
                            "value": "@require structure.fileE @require structure.fileD"
                        },
                        {
                            "type": "Line",
                            "value": "@require structure.fileE @require structure.fileD"
                        }
                    ]
                }
            },
            mixed: {
                withEmptyBlock: {
                    comments: [
                        {type: 'Block', value: '*'},
                        {type: 'Line', value: '@require'},
                        {type: 'Line', value: '@require'}
                    ]
                },
                withEmptyLine: {
                    comments: [
                        {type: 'Block', value: '*@require'},
                        {type: 'Line', value: ''},
                        {type: 'Line', value: '@require'}]
                },


                full: {
                    comments: [
                        {type: 'Block', value: '*@require'},
                        {type: 'Line', value: '@require'},
                        {type: 'Line', value: '@require'}
                    ]
                }
            }
        }
    }
};


module.exports = data;