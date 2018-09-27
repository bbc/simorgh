# Data Validator

## Overview

Using the OpenAPI 3.0 standard we've defined a schema to both validate our data against but also to document our applications data source using the framework Swagger.

This validator takes the yaml [schema](https://github.com/bbc-news/simorgh/blob/latest/data/schema.yaml) we've defined and validates the JSON payload against it. This allows us to ensure the data is in a format we expect before attempting to render it.

## Complexities

Due to the recursive nature of our data payload there is some complex logic of how the validator traverses both the schema and data simultaneously. ValidateNode.js therefore has some intricate logic as both the method ValidateNode and ValidateBlocks can be recursively called within a current invocation of the same running method.

For example for the validator to validate the text block, which has a nested paragraph block which also has a nested text field, the following functions are invoked in order:
```
validateBlock (text)                // start validating the 'text' block
└┬validateNode                      // validate type, required and call validateProperties
 └┬validateProperties
  │
  ├┬validateProperty                // validate property 'text:type'
  │└┬recursivelyCallValidateNode
  │ └─validateNode                  // validate that 'text:type' is type string
  │
  ├┬validateProperty                // validate property 'text:blockId'
  │└┬recursivelyCallValidateNode
  │ └─validateNode                  // validate that 'text:blockId' is type string
  │
  └┬validateProperty                // validate property 'text:model'
   └┬recursivelyCallValidateNode
    │
    └┬validateNode
     └┬validateProperties
      │
      └┬validateProperty                      // validate property 'text:model:blocks'
       └┬recursivelyCallValidateBlock
        └┬validateBlock (text:blocks)         // validate the nested 'blocks' within 'text:model'
         └┬validateNode                       // validate type, required and call validateProperties
          └┬handleSchemaItems                 // handle the array of 'blocks'
           └┬recursivelyCallValidateBlock
            └┬validateBlock (text:blocks:paragraph)     // validate the nested 'paragraph' block
             └┬validateNode                             // validate type, required and call validateProperties
              └┬validateProperties
               │
               ├┬validateProperty                       // validate property 'paragraph:blockId'
               │└┬recursivelyCallValidateNode
               │ └─validateNode                         // validate that 'paragraph:blockId' is type string
               │
               ├┬validateProperty                       // validate property 'paragraph:model'
               │└┬recursivelyCallValidateNode
               │ └┬validateNode                         // validate type, required and call validateProperties
               │  └┬validateProperties
               │   └┬validateProperty                   // validate property 'model:text'
               │    └┬recursivelyCallValidateNode
               │     └─validateNode                     // validate that 'model:text' is type string
               │
               └┬validateProperty                       // validate property 'paragraph:type'
                └┬recursivelyCallValidateNode
                 └─validateNode                         // validate that 'paragraph:type' is type string
}
```

In this example validateBlock is recursively called twice and validateNode is recursively called 8 times.
