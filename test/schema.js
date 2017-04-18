/**
 * Created by steveetm on 2017. 04. 14..
 */
let schema = {
    AST: {
        comments: {
            title: 'AST comments',
            type: 'array',
            items: {
                type: 'object',
                required: ['tags', 'line'],
                properties: {
                    tags: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['tag', 'name'],
                            properties: {
                                tag: {
                                    type: 'string'
                                },
                                name: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    line: {
                        type: 'number'
                    }
                }
            }
        }
    }
};

module.exports = schema;