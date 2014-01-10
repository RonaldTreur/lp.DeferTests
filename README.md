lp.DeferTests
=============

Titanium Alloy project code containing the test-cases (and ProcessManager example) as used in Ronald's "Making the most of your single thread"-presentation.

You can find the presentation here:
http://www.slideshare.net/ronaldtreur/titanium-making-the-most-of-your-single-thread


Tests contained
===============

Test 1: Heavy process that does nothing special (no defer)

Test 2: Defer is used on the second part of the heavy process

Test 3: Defer is used on every iteration of the loop defined in the heavy process

Test 4: Instead of a loop, each invocation now calls the nest (using defer) recursively

Test 5: As 4, but using the ProcessManager which obscures the actual defer-calls and provides you with additional options to fine-tune your heavy processes


Tests description
=================

1) Open a test (1-5)
2) Tap "Start heavy process" and keep an eye at the debug console  (INFO-level is required)
3) Tap "Open window" (only once or twice) shortly after
4) Notice the delay before the dialog is opened (Test 1 - 3) / Notice the dialog is shown immediately (Test 4-5)


Disclaimer
==========

This code was created in a single afternoon and does not (necessarily) represent the best way to write Alloy projects. It serves a single purpose: To show you the power of 'Defer' and how to make optimal use of this Underscore command.

If you are not using Underscore (e.g. because you are not using Alloy), you can accomplish the same using a setTimout-call using 0ms.

In the near future I will update this example and the ProcessManager in order to further simply the test-cases and make the code more correct. If you notice any quirks, please supply a pull-request or send me a message.
