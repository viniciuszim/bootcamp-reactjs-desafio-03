# Desafio 3

Configure uma estrutura com create-react-app. Além disso, utilize as ferramentas ESLint, EditorConfig e Prettier durante o desenvolvimento desse projeto.

Neste desafio você vai construir uma aplicação utilizando a biblioteca React Map GL da Uber. A aplicação se trata de um repositório de localização de desenvolvedores. O usuário poderá adicionar desenvolvedores ao mapa clicando sobre o mesmo e informando o username do Github do desenvolvedor, dessa forma, a aplicação irá captar os dados do dev via API e salvá-lo no estado do Redux.

## Utilize o seguinte layout na aplicação:

![Listagem](/assets/listagem.png)
![New](/assets/new.png)

Veja que na esquerda temos uma lista dos usuários cadastrados enquanto que no mapa temos os avatares do usuário indicando sua posição no mapa.

## Ponto de partida

Para você se basear para utilização do mapa e controle do clique deixei um projeto para você utilizar como exemplo: https://github.com/Rocketseat/goreact-exemplo-mapbox. Nesse projeto utilizamos a biblioteca [MapBox](http://mapbox.com/) para renderizar o mapa, **talvez seja necessário você criar uma conta gratuita** para obter um **access token**.

## Fluxo

1. O usuário acessa a aplicação;
2. O usuário clica sobre o mapa para adicionar um novo usuário à posição clicada;
3. Um modal abre sobre a tela com um único campo, o username do Github;
4. A aplicação busca informações como nome e avatar do usuário da API do Github e salva o usuário no store do Redux;
5. O usuário adicionado agora aparece no mapa e na lista lateral;
6. Caso o usuário digitado no input for inválido uma mensagem deve ser retornada, assim como se tudo ocorrer bem deve ser retornada uma mensagem de sucesso (você pode utilizar a lib https://github.com/fkhadra/react-toastify);
7. Deve ser possível excluir usuários da listagem clicando sobre o “x” na sidebar;

## Exemplo de URL da API

Usuário: http://api.github.com/users/viniciuszim
