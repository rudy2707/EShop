function Camera()
{
	this.phi = 0;
	this.theta = 0;

	this.position = [0, 0, 0];
	this.orientation = [1, 0, 0];
	this.vAxis = [0, 1, 0];

	this.targetPoint = [1, 0, 0]

	this.speed = 0.5;
	this.sensivity = 0.1;


	this.orientate = function(relX, relY)
	{
		this.theta -= relX * this.sensivity;
		this.phi -= relY * this.sensivity;

		this.phi < 89.0 ? this.phi : 89.0;
		this.phi > -89.0 ? this.phi : -89.0;

		var radPhi = this.phi * Math.PI / 180;
		var radTheta = this.theta * Math.PI / 180;

		if(this.vAxis[0])
		{
			this.orientation[0] = Math.sin(radPhi);
			this.orientation[1] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[2] = Math.cos(radPhi) * Math.sin(radTheta);
		}
		else if(this.vAxis[1])
		{
			this.orientation[1] = Math.sin(radPhi);
			this.orientation[2] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[0] = Math.cos(radPhi) * Math.sin(radTheta);
		}
		else
		{
			this.orientation[2] = Math.sin(radPhi);
			this.orientation[0] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[1] = Math.cos(radPhi) * Math.sin(radTheta);
		}

		var cross = [];
		cross[0] = this.vAxis[1] * this.orientation[2] - this.vAxis[2] * this.orientation[1];
		cross[1] = this.vAxis[2] * this.orientation[0] - this.vAxis[0] * this.orientation[2];
		cross[2] = this.vAxis[0] * this.orientation[1] - this.vAxis[1] * this.orientation[0];

		this.lateralMove = new Vector3(cross).normalize();

		this.targetPoint = this.position + this.orientation;

		
		/*
		sx = fy * upZ - fz * upY;
		sy = fz * upX - fx * upZ;
		sz = fx * upY - fy * upX;
		*/
	}


	this.displace = function()
	{
		if(inputs.mouseMoves())
		{
			this.orientate(inputs.relX, inputs.relY);
		}

		//TODO : config file for keyboard layout
		if(inputs.keys["w"])
		{
			this.position[0] += this.orientation[0] * this.speed;
			this.position[1] += this.orientation[1] * this.speed;
			this.position[2] += this.orientation[2] * this.speed;

			this.targetPoint[0] += this.orientation[0];
			this.targetPoint[1] += this.orientation[1];
			this.targetPoint[2] += this.orientation[2];
		}

		if(inputs.keys["s"])
		{
			this.position[0] -= this.orientation[0] * this.speed;
			this.position[1] -= this.orientation[1] * this.speed;
			this.position[2] -= this.orientation[2] * this.speed;

			this.targetPoint[0] += this.orientation[0];
			this.targetPoint[1] += this.orientation[1];
			this.targetPoint[2] += this.orientation[2];
		}

		if(inputs.keys["a"])
		{
			this.position[0] += this.lateralMove[0] * this.speed;
			this.position[1] += this.lateralMove[1] * this.speed;
			this.position[2] += this.lateralMove[2] * this.speed;

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		if(inputs.keys["d"])
		{
			this.position[0] -= this.lateralMove[0] * this.speed;
			this.position[1] -= this.lateralMove[1] * this.speed;
			this.position[2] -= this.lateralMove[2] * this.speed;

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}


		this.targetPoint[0] = this.orientation[0];
		this.targetPoint[1] = this.orientation[1];
		this.targetPoint[2] = this.orientation[2];
		//console.log(inputs.mouseMoves());
	}



}
