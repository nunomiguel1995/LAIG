/**
* LinearAnimation
* @constructor
*/
function LinearAnimation(scene, id, span, listControlPoints) {
    CGFobject.call(this,scene);

  /*  this.init(this.scene, id, span);

    this.controlPoints = listControlPoints;
    this.dist = [];

    this.speed = this.dist / this.span;

    this.transformation = mat4.create();
    mat4.identity(this.transformMatrix);

    this.original = mat4.create();*/
}

LinearAnimation.prototype = new Animation();

LinearAnimation.prototype.apply = function(currTime){


}

/*
*	Animação Linear
*
*	Percorre-se todos os controlPointsDistance - segmentDist - (pontos de controlo que contêm a distância que o objeto já percorreu)
*	Se a distância percorrida num determinado ponto de controlo (this.animation.initialControlPoint[i]) ainda não é a total
*	então o objeto vai fazer uma translação com as informações desse ponto de controlo (this.animation.controlPoints[i])
*
*
*	Quando se verifica que o objeto ainda não percorreu toda a distância num determinado ponto de controlo
*
*	o primeiro passo é atribuir a matriz inicial do objeto calculada no método "setMatrix"
*	o segundo passo é calcular a orientação que o objeto tem que tomar:
*
*
*	-cria-se uma matriz identidade para aplicar a rotação inicial
*	-calcula-se o ângulo a ser rodado
*
*			_____________x
*			|\
*			| \
*			|  \
*			|   \
*		  z	|ang \
*
*					  --------------
*		hipotenusa = v  x^2  +  z^2
*
*		ang = sen-1(x / hipotenusa) [sen(ang) = c. oposto / hipotenusa]
*
*		O x e o z são a distância a percorrer em cada ponto de controlo
*
*	-aplica-se a rotação na matriz identidade
*
*
*
*
*	o terceiro passo é calcular a distância a percorrer nesta atualização com base no intervalo de tempo
*
*						 distância
*		velocidade = -------------------     <=>   distância = velocidade * intervalo de tempo
*					  intervalo tempo
*
*
*	o quarto passo é atualizar a distância percorrida neste ponto de controlo nas variáveis da classe da animação linear (LinearAnimation)
*	Há uma verificação de erro para ter a certeza que o objeto não vai percorrer mais do que aquilo que é suposto ou seja,
*	se a distância acumulada/percorrida no ponto de controlo é maior que a que é suposto percorrer então é subtraída à distância
*	calculada anteriormente, aquela que garante que o objeto percorre apenas a distância correta.
*
*
*	O quinto passo é calcular a distância a percorrer em cada eixo:
*
*	da fórmula:
*					 -----------------------------------------
*		distância = v  (val * x)^2 + (val * y)^2 + (val * z)^2
*
*		As variáveis x, y e z são obtidas a partir da distância a percorrer em cada eixo, guardadas no ponto de controlo atual (this.animation.controlPoints[i])
*
*	resulta:         -------------------------------------------
*					/
*				   /				 distância^2
*		val = 	  /	   ----------------------------------------
*				 /
*               /         x^2    +     y^2       +    z^2
*			   v
*
*
*		Esse valor (val) vai ser usado para calcular a distância percorrida em cada eixo.
*
*
*
*	Cria-se assim uma matriz de translação
*
* 	Aplica-se a matriz de rotação e de translação à matriz de transformações
*/
