---
title: "Ensinar uma IA a conduzir: desenhamos a pressão, não o condutor"
date: "2026-07-06"
description: "Como construí um laboratório observável de neuroevolução, substituí uma direção arbitrária por geometria e descobri que desenhar a recompensa era o verdadeiro trabalho."
tags: ["IA", "Neuroevolução", "Simulação", "Design"]
---

O meu projeto de carro autónomo parece um brinquedo. Carros em píxeis oscilam numa pista 2D, batem nas paredes e, aos poucos, tornam-se menos maus a conduzir.

Comecei depois de ver [*Inteligência Artificial aprendendo a DIRIGIR!! (Deep Cars)*](https://www.youtube.com/watch?v=gnfkfUQvKDw), do [Universo Programado](https://www.youtube.com/@UniversoProgramado). O vídeo despertou-me a vontade de experimentar a ideia.

Esperava que a rede neuronal fosse a parte difícil. O que me ocupou foi tudo à volta dela. Quando um sistema aprende, cada decisão imprecisa regressa como um comportamento que precisa de ser compreendido através de pontuações e estatísticas.

## Construir o carro

Usei Python para poder experimentar diferentes métodos de aprendizagem sem ter de construir todas as ferramentas numéricas. O Pygame tratou da simulação e da apresentação gráfica.

Antes de acrescentar a IA, precisava de um carro que eu próprio pudesse conduzir. Tinha de acelerar, travar, recuar e virar nas duas direções. Esta parte foi agradavelmente normal.

Criei também quatro aparências e escolhi uma ao acaso para cada carro. Acrescentaram variedade sem alterar o comportamento de nenhum deles.

![As quatro aparências dos carros usadas na simulação](/blog/teaching-ai-car/car-skins.svg)

*Quatro aparências visuais, um único modelo de condução.*

Antes da apresentação, todas as imagens foram redimensionadas para o mesmo tamanho. As quatro aparências partilhavam, assim, o mesmo movimento e a mesma física.

As setas do teclado controlavam o carro. Cima acelerava, baixo abrandava ou fazia marcha-atrás e esquerda e direita viravam. Ao libertar o acelerador, a resistência reduzia gradualmente a velocidade.

![Um carro conduzido manualmente numa curva da pista em Pygame](/blog/teaching-ai-car/human-controlled-car.png)

*O mundo controlado por uma pessoa criou uma referência para testar o movimento e o comportamento do carro.*

O primeiro modelo de direção alterava a orientação a uma velocidade angular fixa e usava depois seno e cosseno para converter essa orientação e velocidade em movimento horizontal e vertical. Era simples, mas permitia ao carro rodar sem descrever o círculo seguido por um veículo real de quatro rodas.

Substituí esse atalho por um centro instantâneo de curvatura, ou `CC`. Numa curva à direita, a roda dianteira direita `R3`, a roda traseira direita `R4` e o `CC` formam um triângulo retângulo. Se `L` é a distância entre eixos e `δ` o ângulo da roda dianteira, a distância da roda traseira interior ao `CC` é:

```text
distância R4-CC = L / tan(|δ|)
raio do centro do eixo traseiro = largura do carro / 2 + distância R4-CC
```

Uma curva à esquerda espelha a mesma construção através das rodas `R1` e `R2`. O ângulo máximo da roda interior é de 30 graus.

Depois de conhecer o `CC`, reconstruo a posição do eixo traseiro e da carroçaria sobre o mesmo arco circular após cada passo. Um carro parado não consegue rodar. A marcha-atrás segue o mesmo círculo no sentido oposto. Acima de tudo, o centro da curva fica agora fora do carro, em vez de ser uma rotação invisível aplicada no seu centro.

Conduzi-lo eu próprio foi um teste útil. Se o carro parecesse errado nas minhas mãos, não fazia sentido culpar o algoritmo de aprendizagem.

## Mapear a pista

Depois de o carro conseguir mover-se, precisava de uma definição da estrada. Usei uma imagem da pista cujas cores separavam o espaço transitável de tudo o resto.

O programa percorreu cada píxel e comparou-o com a cor da estrada, RGB `(111, 112, 115)`. Os píxeis correspondentes tornaram-se `1` numa matriz. Todos os outros tornaram-se `0`.

```text
1 = dentro da pista
0 = fora da pista
```

![Uma grelha colorida da pista convertida numa matriz binária, seguida da consulta de colisão](/blog/teaching-ai-car/track-matrix.svg)

*A pista visual torna-se num mapa binário que a simulação consegue consultar.*

A deteção de colisões passou a ser uma consulta. Convertia a posição do carro em coordenadas da matriz e verificava a célula. Um `0` significava que o carro tinha saído da estrada.

Podia guardar a matriz num ficheiro de texto e carregá-la mais tarde. A imagem controlava o aspeto da pista. A matriz controlava onde o carro podia circular.

O novo raio de direção precisava de mais espaço, por isso aumentei a simulação de `800 × 800` para `1000 × 1000`, mantendo o carro com `20 × 32` píxeis. Não foi apenas um redimensionamento de imagem. Um único fator de escala de `1.25` também desloca os pontos de partida, os checkpoints ordenados, o raio dos checkpoints e os blocos de cobertura. Cada célula da grelha binária original de 800 píxeis ocupa agora 1,25 píxeis no ecrã.

A visão usa uma máscara estática de obstáculos, reconstruída a partir do fundo ampliado. Assim, aquilo que os raios consideram uma parede permanece alinhado com o que o utilizador vê, incluindo quando as camadas de depuração estão visíveis.

## Refatorar o sistema

O primeiro protótipo funcionava, mas quase tudo dependia do mesmo ciclo de jogo: entrada, movimento, colisões, sensores, apresentação e as primeiras experiências com IA.

Raffaele Fiorillo ajudou-me a separar estas partes. Mantivemos a versão original num pacote obsoleto e dividimos as entidades do jogo, a lógica da IA, os utilitários partilhados e os ambientes de simulação.

Raffaele introduziu a ideia de mundos. Um mundo base continha o ciclo de jogo comum. Três mundos especializados tratavam da condução manual, do treino da IA e dos testes da IA.

![Mundo Base ramificado em Controlo Humano, Treino de IA e Teste de IA, todos a controlar o mesmo modelo de Carro](/blog/teaching-ai-car/world-architecture.svg)

*Mundos separados reutilizam o mesmo carro e alteram apenas aquilo que o controla.*

O carro tornou-se numa entidade independente, com métodos para acelerar, travar, recuar e virar. Não precisava de saber se os comandos vinham de um teclado ou de uma rede neuronal.

Depois desta refatoração, podia mudar o condutor sem mudar o carro. O projeto passou finalmente a parecer um espaço para testar estratégias de condução, em vez de uma demonstração com IA acrescentada à força.

## Construir o cérebro

O condutor é uma rede neuronal feed-forward evoluída com NEAT. A primeira versão começou com nove entradas, três saídas e nenhum nó escondido. Inicialmente, cada entrada estava ligada a cada saída.

O NEAT descreve cada condutor através de um **genoma**, uma representação compacta da sua rede neuronal. O genoma regista os neurónios, as ligações, os estados ativos e os pesos das ligações.

Tal como o equivalente biológico, este genoma pode ser copiado, combinado e alterado entre gerações. Não é o carro nem a rede terminada. É a informação que o NEAT usa para construir a rede.

Quatro entradas descreviam o carro: posição horizontal, posição vertical, velocidade e orientação. Cinco raios sensores mediam a distância à frente, à esquerda, à direita, à frente-esquerda e à frente-direita.

As escalas não coincidem. As posições atingem centenas de píxeis, a velocidade chega a `700` e os raios sensores chegam a `1000`. Valores em bruto desta dimensão saturariam rapidamente a função `tanh`.

Normalizei-os primeiro. A posição foi dividida pelo tamanho do ecrã, a velocidade pela velocidade máxima, a orientação por π e cada raio pelo seu alcance máximo.

![Nove entradas normalizadas passam por uma rede NEAT ponderada e tornam-se em três saídas de condução](/blog/teaching-ai-car/neural-network.svg)

*A primeira rede de nove entradas transformava o estado e a visão do carro em intenções de aceleração, travagem e direção.*

Este conjunto de entradas bastava para evitar paredes, mas não para indicar o percurso. A rede atual tem 13 entradas. A orientação passou a valores separados de seno e cosseno para eliminar a descontinuidade entre `−π` e `π`. Foram adicionados dois raios pouco inclinados junto dos cantos dianteiros. A última entrada foi um ângulo com sinal em relação ao próximo checkpoint: positivo significa que o alvo está à esquerda, negativo significa direita e zero significa em frente.

As sete distâncias dos raios são agora convertidas em valores de proximidade num horizonte útil de 250 píxeis. Uma parede próxima produz um sinal forte, enquanto o espaço vazio distante deixa de dominar a rede.

Cada ligação tem um peso. Pesos positivos empurram um neurónio na mesma direção da entrada; pesos negativos fazem o contrário. Um valor absoluto maior exerce mais influência.

Um neurónio multiplica cada entrada pelo respetivo peso, soma os resultados e acrescenta um desvio. O desvio altera a facilidade com que o neurónio se torna positivo ou negativo.

```text
z = desvio + Σ(entrada × peso)
saída = tanh(2.5 × z)
```

O valor de resposta permanece fixo em `1.0`. O NEAT continua a poder alterar pesos e desvios, desativar ligações e adicionar ou remover nós ao longo das gerações.

A rede devolve três valores entre `−1` e `1` para a força do motor, travagem e direção. O primeiro controlador convertia esses valores num pequeno conjunto de ações através de dois limites.

Valores inferiores a `−0.7` tornam-se `−1`. Valores entre `−0.7` e `0.7` tornam-se `0`. Tudo o que fica acima de `0.7` torna-se `1`.

![Saídas contínuas da rede neuronal divididas em controlos discretos nos limites menos 0,7 e mais 0,7](/blog/teaching-ai-car/output-thresholds.svg)

*O primeiro controlador usava limites para transformar sinais incertos num espaço de ações compacto.*

Para o motor, estes valores significavam marcha-atrás, ponto morto e avanço. Para a direção, significavam direita, em frente e esquerda. A travagem devia usar apenas `0` para desligada e `1` para ligada.

Isto revelou um erro: a travagem usava o mesmo conversor de três valores, por isso uma saída muito negativa tornava-se `−1`, apesar de a API do travão definir apenas `0` e `1`.

Removi o erro e os limites. O controlador atual é contínuo: acelerador e travão ficam limitados a `[0, 1]`, a direção permanece em `[-1, 1]` e a travagem reduz progressivamente uma aceleração simultânea. Em cada frame, o sistema mede 13 entradas, ativa a rede, converte as três saídas em ações proporcionais e atualiza a física geométrica.

## O ciclo de aprendizagem

O NEAT não treina um condutor até este se tornar bom. Testa uma população, conserva características úteis e tenta novamente:

![O ciclo completo de aprendizagem, desde a criação de uma população de genomas à simulação, pontuação, seleção, recombinação e mutação](/blog/teaching-ai-car/learning-loop.svg)

*O ciclo original usava 30 genomas. A população atual usa 100, mas a sequência de avaliar, selecionar, reproduzir e alterar permanece igual.*

Comecei com controlos aproximados porque menos ações possíveis davam à evolução um espaço de pesquisa menor. Quando os sinais de treino se tornaram mais fáceis de inspecionar, os controlos proporcionais permitiram correções mais finas e uma travagem mais realista.

A normalização é importante pela mesma razão. Se uma entrada for minúscula ao lado de outra, a rede pode efetivamente deixar de a ouvir.

## Escolher evolução em vez de reforço

A primeira tentativa usou aprendizagem por reforço tabular. Mantinha uma pontuação para cada par situação-ação, tal como a versão dos manuais.

A implementação estava correta. O problema era a adequação. Um carro mede várias distâncias *contínuas*, enquanto uma tabela precisa de situações que consiga enumerar.

Manter precisão suficiente faz a tabela explodir. Reduzir o número de estados desfoca os dados dos sensores até deixarem de ser úteis para conduzir.

> Deixei a abordagem falhada numa pasta obsoleta. Explica a decisão melhor do que um resumo polido.

Mudei para neuroevolução porque trabalha com entradas contínuas e consegue evoluir a própria *estrutura* da rede. Os condutores começam com o cérebro mais simples e ganham complexidade apenas quando uma mutação sobrevive à seleção.

Eu defino o que merece uma pontuação. O NEAT decide que estruturas de rede vale a pena manter.

## Desenhar a recompensa, não o condutor

A maior parte do tempo foi dedicada à recompensa. A primeira ideia era pontuar a distância percorrida. Os carros encontraram uma falha óbvia: conduzir em círculos para sempre e acumular pontos sem progredir.

A versão seguinte pontuava *novo terreno percorrido*:

1. Apenas terreno novo oferece uma recompensa relevante.
2. Regressar a terreno já percorrido tem um custo.
3. Permanecer no mesmo lugar tem um custo e ficar ali demasiado tempo termina a execução. Um carro bloqueado não deve continuar a consumir tempo de simulação.
4. Sobreviver, por si só, vale quase nada: pode desempatar dois condutores iguais, mas nunca ultrapassar um que avançou.

Cada regra existe porque uma geração anterior encontrou uma forma de explorar a pontuação. Os carros não me compreenderam mal. Seguiram exatamente o incentivo que eu tinha escrito.

A cobertura resolveu o abuso dos círculos, mas continuava sem definir um percurso ordenado. Substituí-a por 53 checkpoints ao longo da linha central. Apenas o próximo checkpoint permite avançar. A aptidão combina checkpoints concluídos, a melhor aproximação ao próximo, um pequeno desempate por sobrevivência e uma penalização por permanecer demasiado tempo no mesmo bloco.

A sequência de checkpoints resolveu outro problema. Os raios respondem a “onde existe espaço livre?”, mas não a “que ramo pertence ao percurso?”. O ângulo com sinal para o próximo checkpoint dá à rede essa intenção em falta sem conduzir diretamente o carro.

## Tornar a evolução observável

As falhas mais difíceis pareciam iguais por fora: os carros viravam para o lado errado, deixavam de melhorar ou morriam sempre na mesma curva. Apenas ao observar as imagens, não conseguia perceber se a causa era perceção, controlo, aptidão ou mutação.

Acrescentei um painel de telemetria em direto ao lado da simulação. Segue o líder atual ou um genoma selecionado e mostra as 13 entradas normalizadas, ativações escondidas e de saída, sinais das ligações, ações processadas, progresso nos checkpoints, espécie e histórico de aptidão.

Acrescentei também uma camada do mapa binário, visualização dos raios, vista de cobertura, pausa, avanço frame a frame e marcadores ordenados dos checkpoints. O treino deixou de ser uma caixa negra. Pude testar os sinais da direção e a orientação dos sensores e perceber que a verdadeira falha nas curvas à esquerda era a ausência de informação sobre a rota, não controlos invertidos.

Depois de acrescentar o ângulo para o checkpoint e voltar a treinar, a população concluiu a pista original. A direção geométrica e a pista posterior de 1000 píxeis alteram o ambiente sem mudar o esquema da rede, por isso os genomas antigos ainda podem ser carregados, mas devem ser treinados novamente antes de considerar resolvida a versão ampliada.

Foi isto que retirei do projeto. Um otimizador segue a métrica, seja uma IA de condução, um objetivo de equipa ou um indicador de produto. Não programei um bom condutor. Tive de definir o que significava conduzir bem.
