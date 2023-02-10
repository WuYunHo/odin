import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.css'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { history, useModel } from '@umijs/max';

const Login: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
      console.log(engine);

      // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
      await console.log(container);
  }, []);

  const { initialState, setInitialState } = useModel('@@initialState')
  const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      //修改全局的initialState，使主面板渲染Layout
      setInitialState({
        isLogin: true,
        userInfo:values
      })

      //触发路由切换至
    
    setTimeout(() => {
      history.push('/')
    },0)
      
    };
  

  return (
    <div>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} params={
       {
          "autoPlay": true,
          "background": {
            "color": {
              "value": "#ffffff"
            },
            "image": "url('https://particles.js.org/images/background3.jpg')",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover",
            "opacity": 1
          },
          "backgroundMask": {
            "composite": "destination-out",
            "cover": {
              "color": {
                "value": {
                  "r": 255,
                  "g": 255,
                  "b": 255
                }
              },
              "opacity": 1
            },
            "enable": true
          },
          "defaultThemes": {},
          "delay": 0,
          "fullScreen": {
            "enable": true,
            "zIndex": 1
          },
          "detectRetina": true,
          "duration": 0,
          "fpsLimit": 120,
          "interactivity": {
            "detectsOn": "window",
            "events": {
              "onClick": {
                "enable": true,
                "mode": "push"
              },
              "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble",
                "parallax": {
                  "enable": false,
                  "force": 60,
                  "smooth": 10
                }
              },
              "resize": {
                "delay": 0.5,
                "enable": true
              }
            },
            "modes": {
              "attract": {
                "distance": 200,
                "duration": 0.4,
                "easing": "ease-out-quad",
                "factor": 1,
                "maxSpeed": 50,
                "speed": 1
              },
              "bounce": {
                "distance": 200
              },
              "bubble": {
                "distance": 400,
                "duration": 2,
                "mix": false,
                "opacity": 1,
                "size": 100,
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "mix": false,
                  "selectors": []
                }
              },
              "connect": {
                "distance": 80,
                "links": {
                  "opacity": 0.5
                },
                "radius": 60
              },
              "grab": {
                "distance": 400,
                "links": {
                  "blink": false,
                  "consent": false,
                  "opacity": 1
                }
              },
              "push": {
                "default": true,
                "groups": [],
                "quantity": 4
              },
              "remove": {
                "quantity": 2
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4,
                "factor": 100,
                "speed": 1,
                "maxSpeed": 50,
                "easing": "ease-out-quad",
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad",
                  "selectors": []
                }
              },
              "slow": {
                "factor": 3,
                "radius": 200
              },
              "trail": {
                "delay": 1,
                "pauseOnStop": false,
                "quantity": 1
              },
              "light": {
                "area": {
                  "gradient": {
                    "start": {
                      "value": "#ffffff"
                    },
                    "stop": {
                      "value": "#000000"
                    }
                  },
                  "radius": 1000
                },
                "shadow": {
                  "color": {
                    "value": "#000000"
                  },
                  "length": 2000
                }
              }
            }
          },
          "manualParticles": [],
          "particles": {
            "bounce": {
              "horizontal": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              },
              "vertical": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              }
            },
            "collisions": {
              "absorb": {
                "speed": 2
              },
              "bounce": {
                "horizontal": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                },
                "vertical": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                }
              },
              "enable": false,
              "mode": "bounce",
              "overlap": {
                "enable": true,
                "retries": 0
              }
            },
            "color": {
              "value": "#ffffff",
              "animation": {
                "h": {
                  "count": 0,
                  "enable": false,
                  "offset": 0,
                  "speed": 1,
                  "decay": 0,
                  "sync": true
                },
                "s": {
                  "count": 0,
                  "enable": false,
                  "offset": 0,
                  "speed": 1,
                  "decay": 0,
                  "sync": true
                },
                "l": {
                  "count": 0,
                  "enable": false,
                  "offset": 0,
                  "speed": 1,
                  "decay": 0,
                  "sync": true
                }
              }
            },
            "groups": {},
            "move": {
              "angle": {
                "offset": 0,
                "value": 90
              },
              "attract": {
                "distance": 200,
                "enable": false,
                "rotate": {
                  "x": 600,
                  "y": 1200
                }
              },
              "center": {
                "x": 50,
                "y": 50,
                "mode": "percent",
                "radius": 0
              },
              "decay": 0,
              "distance": {},
              "direction": "none",
              "drift": 0,
              "enable": true,
              "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "inverse": false,
                "maxSpeed": 50
              },
              "path": {
                "clamp": true,
                "delay": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 0
                },
                "enable": false,
                "options": {}
              },
              "outModes": {
                "default": "out",
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
              },
              "random": false,
              "size": false,
              "speed": 2,
              "spin": {
                "acceleration": 0,
                "enable": false
              },
              "straight": false,
              "trail": {
                "enable": false,
                "length": 10,
                "fill": {}
              },
              "vibrate": false,
              "warp": false
            },
            "number": {
              "density": {
                "enable": true,
                "width": 1920,
                "height": 1080
              },
              "limit": 0,
              "value": 80
            },
            "opacity": {
              "random": {
                "enable": false,
                "minimumValue": 0.1
              },
              "value": 1,
              "animation": {
                "count": 0,
                "enable": false,
                "speed": 1,
                "decay": 0,
                "sync": false,
                "destroy": "none",
                "startValue": "random",
                "minimumValue": 0.1
              }
            },
            "reduceDuplicates": false,
            "shadow": {
              "blur": 0,
              "color": {
                "value": "#000"
              },
              "enable": false,
              "offset": {
                "x": 0,
                "y": 0
              }
            },
            "shape": {
              "options": {},
              "type": "circle"
            },
            "size": {
              "random": {
                "enable": true,
                "minimumValue": 1
              },
              "value": {
                "min": 1,
                "max": 30
              },
              "animation": {
                "count": 0,
                "enable": false,
                "speed": 40,
                "decay": 0,
                "sync": false,
                "destroy": "none",
                "startValue": "random",
                "minimumValue": 0.1
              }
            },
            "stroke": {
              "width": 0
            },
            "zIndex": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "opacityRate": 1,
              "sizeRate": 1,
              "velocityRate": 1
            },
            "life": {
              "count": 0,
              "delay": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "sync": false
              },
              "duration": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.0001
                },
                "value": 0,
                "sync": false
              }
            },
            "rotate": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "animation": {
                "enable": false,
                "speed": 0,
                "decay": 0,
                "sync": false
              },
              "direction": "clockwise",
              "path": false
            },
            "destroy": {
              "bounds": {},
              "mode": "none",
              "split": {
                "count": 1,
                "factor": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 3
                },
                "rate": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": {
                    "min": 4,
                    "max": 9
                  }
                },
                "sizeOffset": true,
                "particles": {}
              }
            },
            "roll": {
              "darken": {
                "enable": false,
                "value": 0
              },
              "enable": false,
              "enlighten": {
                "enable": false,
                "value": 0
              },
              "mode": "vertical",
              "speed": 25
            },
            "tilt": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "animation": {
                "enable": false,
                "speed": 0,
                "decay": 0,
                "sync": false
              },
              "direction": "clockwise",
              "enable": false
            },
            "twinkle": {
              "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              },
              "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              }
            },
            "wobble": {
              "distance": 5,
              "enable": false,
              "speed": {
                "angle": 50,
                "move": 10
              }
            },
            "orbit": {
              "animation": {
                "count": 0,
                "enable": false,
                "speed": 1,
                "decay": 0,
                "sync": false
              },
              "enable": false,
              "opacity": 1,
              "rotation": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 45
              },
              "width": 1
            },
            "links": {
              "blink": false,
              "color": {
                "value": "#fff"
              },
              "consent": false,
              "distance": 100,
              "enable": false,
              "frequency": 1,
              "opacity": 1,
              "shadow": {
                "blur": 5,
                "color": {
                  "value": "#000"
                },
                "enable": false
              },
              "triangles": {
                "enable": false,
                "frequency": 1
              },
              "width": 1,
              "warp": false
            },
            "repulse": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "enabled": false,
              "distance": 1,
              "duration": 1,
              "factor": 1,
              "speed": 1
            }
          },
          "pauseOnBlur": true,
          "pauseOnOutsideViewport": true,
          "responsive": [],
          "smooth": false,
          "style": {},
          "themes": [],
          "zLayers": 100
        }
      }/>
      <div className='formContainer'>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
          </Form>
        </div>
    </div>
  );
};

export default Login;
