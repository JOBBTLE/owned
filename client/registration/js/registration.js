$(document).ready(function(){
              $('.LTMH .H').mousemove(function(){
              $('.LTMH .H').css('background-color', '#00FF00');
              });
                            $('.LTMH .H').click(function(){
                            $('.LTMH').hide(1000);
                            $('.HLMT').css('display', 'block');
                            });
                                          $('.HLMT .T').mousemove(function(){
                                          $('.HLMT .T').css('background-color', '#00FF00');
                                          });
                                                        $('.HLMT .T').click(function(){
                                                        $('.HLMT').hide(1000);
                                                        $('.HTLM').css('display', 'block');
                                                        });
                                                                      $('.HTLM .M').mousemove(function(){
                                                                      $('.HTLM .M').css('background-color', '#00FF00');
                                                                      });
                                                                                    $('.HTLM .M').click(function(){
                                                                                    $('.HTLM').hide(1000);
                                                                                    $('h2').css('display', 'none');
                                                                                    $('h4').css('display', 'block');
                                                                                    $('h4').css('font-size', '1.5em');
                                                                                    $('.HTML').css('display', 'block');
                                                                                    });
                                                                                                  $('.HTML .L').mousemove(function(){
                                                                                                  $('.HTML .L').css('background-color', '#00FF00');
                                                                                                  });
                                                                                                                $('.HTML .L').click(function(){
                                                                                                                $('.demo-4').hide(1000);
                                                                                                                $('.regform').css('display', 'block');
                                                                                                                });
});