function Camera()
{
	this.phi = 0;
	this.theta = 0;

	this.orientation = [1, 0, 0];
	this.vAxis = [0, 1, 0];

	this.lateralMove = [0, 0, 0]
	this.position = [0, 1, 0];

	this.targetPoint = [1, 0, 0]

	this.sensivity = 0.5;
	this.speed = 0.05;

	this.orientate = function(relX, relY)
	{
		this.theta -= (relX * this.sensivity);
		this.phi -= (relY * this.sensivity);

		if(this.phi > 89.0)
			this.phi = 89.0;

		if(this.phi < -89)
			this.phi = -89;

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
			this.orientation[0] = Math.cos(radPhi) * Math.sin(radTheta);
			this.orientation[1] = Math.sin(radPhi);
			this.orientation[2] = Math.cos(radPhi) * Math.cos(radTheta);
		}
		else
		{
			this.orientation[0] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[1] = Math.cos(radPhi) * Math.sin(radTheta);
			this.orientation[2] = Math.sin(radPhi);
		}

		var cross = [];
		cross[0] = this.vAxis[1] * this.orientation[2] - this.vAxis[2] * this.orientation[1];
		cross[1] = this.vAxis[2] * this.orientation[0] - this.vAxis[0] * this.orientation[2];
		cross[2] = this.vAxis[0] * this.orientation[1] - this.vAxis[1] * this.orientation[0];

		var lateralMove = new Vector3(cross);
		lateralMove.normalize();

		this.lateralMove = [lateralMove.elements[0], lateralMove.elements[1], lateralMove.elements[2]]

		this.targetPoint[0] = this.position[0] + this.orientation[0];
		this.targetPoint[1] = this.position[1] + this.orientation[1];
		this.targetPoint[2] = this.position[2] + this.orientation[2];
	}


	this.displace = function()
	{
		if(inputs.mouseMoves() == true)
		{
			this.orientate(inputs.relX, inputs.relY);
		}

		//TODO : config file for keyboard layout
		if(inputs.keys[87])
		//if(inputs.keys[inputs.keyCodes["forward"]])
		{
			var norm = Math.sqrt(Math.pow(this.orientation[0], 2.0) + Math.pow(this.orientation[2], 2.0))

			this.position[0] += ((this.orientation[0] / norm) * this.speed);
			//this.position[1] += (this.orientation[1] * this.speed);
			this.position[2] += ((this.orientation[2] / norm) * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		if(inputs.keys[65])
		//if(inputs.keys[inputs.keyCodes["left"]])
		{
			this.position[0] += (this.lateralMove[0] * this.speed);
			//this.position[1] += (this.lateralMove[1] * this.speed);
			this.position[2] += (this.lateralMove[2] * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}
		
		if(inputs.keys[83])
		//if(inputs.keys[inputs.keyCodes["backward"]])
		{
			this.position[0] -= (this.orientation[0] * this.speed);
			//this.position[1] -= (this.orientation[1] * this.speed);
			this.position[2] -= (this.orientation[2] * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		if(inputs.keys[68])
		//if(inputs.keys[inputs.keyCodes["right"]])
		{
			this.position[0] -= this.lateralMove[0] * this.speed;
			//this.position[1] -= this.lateralMove[1] * this.speed;
			this.position[2] -= this.lateralMove[2] * this.speed;

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}
	}


	this.lookAt = function()
	{
		view.setLookAt(	this.position[0], this.position[1], this.position[2],
			   			this.targetPoint[0], this.targetPoint[1], this.targetPoint[2],
						this.vAxis[0], this.vAxis[1], this.vAxis[2]);
	}


	this.setTargetPoint = function(targetPoint)
	{
		var x = targetPoint[0] - this.position[0];
		var y = targetPoint[1] - this.position[1];
		var z = targetPoint[2] - this.position[2];

		var orientation = new Vector3([x, y, z]);

		orientation.normalize();
		this.orientation[0] = orientation.elements[0];
		this.orientation[1] = orientation.elements[1];
		this.orientation[2] = orientation.elements[2];


		if(this.vAxis[0])
		{
			this.phi = Math.asin(this.orientation[0]);
			this.theta = Math.acos(this.orientation[1] / Math.cos(this.phi));

			if(this.orientation[1] < 0)
			{
				this.theta *= -1;
			}
		}
		else if(this.vAxis[1])
		{
			this.phi = Math.asin(this.orientation[1]);
			this.theta = Math.acos(this.orientation[2] / Math.cos(this.phi));

			if(this.orientation[2] < 0)
			{
				this.theta *= -1;
			}
		}
		else
		{
			this.phi = Math.asin(this.orientation[0]);
			this.theta = Math.acos(this.orientation[2] / Math.cos(this.phi));

			if(this.orientation[2] < 0)
			{
				this.theta *= -1;
			}
		}

		this.phi *= (180 / Math.PI);
		this.theta *= (180 / Math.PI);
	}
}
