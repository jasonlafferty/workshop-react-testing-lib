import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Pokemon from './index';
import { rest } from 'msw'

const meta: Meta = {
  title: 'Components/Pokemon',
  argTypes: {},
  parameters: {
    controls: { expanded: true },
    msw: [
      rest.get('https://pokeapi.co/api/v2/pokemon?limit=25', (req, res, ctx) => {
        return res(
          ctx.json({
            "count": 0,
            "next": "https://pokeapi.co/api/v2/pokemon?offset=25&limit=25",
            "previous": null,
            "results": [
              {
                "name":"dog",
                "url":"https://pokeapi.co/api/v2/pokemon/24/"
              },
              {
                "name":"cat",
                "url":"https://pokeapi.co/api/v2/pokemon/25/"
              }
            ]
          }),
        )
      }),
    ],  
  },
};

export default meta;

const Template: Story<{}> = () => {
    return <Pokemon />;
};

export const Default = Template.bind({});
